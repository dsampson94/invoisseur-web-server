// src/pages/api/auth/signup.js

import bcrypt from 'bcryptjs';
import prisma from '../../../../prisma/instance';

export default async function handle(req, res) {
    if (req.method === 'POST') {
        const { email, password, username } = req.body;

        // Hash the password before storing it in the database
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        try {
            // Create the user in the database
            const user = await prisma.user.create({
                data: {
                    email,
                    username,
                    password: hashedPassword,
                    // You might need to set default values for other fields as required
                },
            });

            // Return the created user (excluding the password)
            return res.status(200).json({ ...user, password: undefined });
        } catch (error) {
            // Handle errors such as duplicate email
            console.error('Signup error:', error);
            res.status(500).json({ error: "Error signing up user." });
        }
    } else {
        // If the request is not POST
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
