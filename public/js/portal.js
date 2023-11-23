const token = localStorage.getItem('token');
const decodeToken = parseJwt(token);
const role = decodeToken.role;

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

if(role=='hr'){
    window.location.href = '../html/portal-hr.html'
} else if(role=='emp'){
    window.location.href = '../html/portal-emp.html'
}