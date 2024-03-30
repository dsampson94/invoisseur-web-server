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

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                // If the server responded with a non-200 status, we throw an error
                throw new Error('Failed to sign up.');
            }

            const data = await response.json();

            // Handle success. For example, redirect to the login page or a welcome page
            // window.location.href = '/welcome';
            console.log('Signup successful:', data);

            // Optionally, clear the form fields here
        } catch (error) {
            // Handle errors, such as displaying a message to the user
            console.error('Signup error:', error);
            alert('Signup failed. Please try again.');
        }
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
