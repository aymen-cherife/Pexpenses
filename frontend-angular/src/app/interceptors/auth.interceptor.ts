import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    const authToken = localStorage.getItem('token');
    console.log('AuthInterceptor: Token:', authToken); // Log the token

    if (authToken) {
        const modifiedRequest = req.clone({
            setHeaders: {
                Authorization: `${authToken}`
            }
        });
        console.log('AuthInterceptor: Modified Request:', modifiedRequest); // Log the modified request
        return next(modifiedRequest);
    }

    console.log('AuthInterceptor: No Auth Token Found');
    return next(req);
};
