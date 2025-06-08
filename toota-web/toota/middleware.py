import logging
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.tokens import AccessToken
from channels.db import database_sync_to_async
from authentication.models import User, Driver
from urllib.parse import parse_qs

logger = logging.getLogger(__name__)

@database_sync_to_async
def get_user_or_driver_from_jwt(token):
    try:
        validated_token = AccessToken(token)
        user_id = validated_token['user_id']
        try:
            driver = Driver.objects.get(id=user_id)
            logger.info(f"Authenticated as Driver: {user_id}")
            return driver
        except Driver.DoesNotExist:
            try:
                user = User.objects.get(id=user_id)
                logger.info(f"Authenticated as User: {user_id}")
                return user
            except User.DoesNotExist:
                logger.error(f"No User or Driver found for ID: {user_id}")
                return AnonymousUser()
    except Exception as e:
        logger.error(f"Token validation failed: {e}")
        return AnonymousUser()

class JWTMiddleware:
    def __init__(self, inner):
        self.inner = inner

    async def __call__(self, scope, receive, send):
        logger.info("JWT Middleware: Starting")
        query_string = scope.get("query_string", b"").decode()
        query_params = parse_qs(query_string)
        token_list = query_params.get("token", [])

        
        if token_list:
            token = token_list[0]
            try:
                user = await get_user_or_driver_from_jwt(token)
                if user is None or user.is_anonymous:
                    logger.warning("JWT Middleware: Invalid token or anonymous user")
                    await self.reject_connection(send)
                    return

                scope["user"] = user
                logger.info("JWT Middleware: Token extracted and user authenticated")
            except Exception as e:
                logger.error(f"JWT Middleware: Token validation error - {str(e)}")
                await self.reject_connection(send)
                return
        else:
            logger.warning("JWT Middleware: No token found in query string")
            await self.reject_connection(send)
            return

        logger.info("JWT Middleware: Calling inner application")
        return await self.inner(scope, receive, send)

    async def reject_connection(self, send):
        await send({
            "type": "websocket.close",
            "code": 4001  # Custom error code
        })
