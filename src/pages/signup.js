// src/pages/signup.js

export default function SignupPage() {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const userData = {
            email: formData.get('email'),
            password: formData.get('password'),
            username: formData.get('username'),
        };

        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username</label>
                <input id="username" name="username" type="text" required />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" required />
            </div>
            <div>
                <button type="submit">Sign Up</button>
            </div>
        </form>
    );
}
