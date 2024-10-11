# your_app/throttles.py
from rest_framework.throttling import SimpleRateThrottle


class SignUpAndLoginThrottle(SimpleRateThrottle):
    # Define the scope for this throttle class
    scope = 'SignUpAndLogin'

    def get_cache_key(self, request, view):
        if request.user.is_authenticated:
            # Use the user ID as the cache key for authenticated users
            return f'throttle_{self.scope}_{request.user.id}'
        else:
            # Use the client's IP address for unauthenticated users
            return self.get_ident(request)
