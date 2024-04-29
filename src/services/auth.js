export function isAuthenticated() {
    const tokens = localStorage.getItem('tokens');

    return !!tokens;
}