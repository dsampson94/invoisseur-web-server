// src/pages/api/auth/signup.js

import bcrypt from 'bcryptjs';
import prisma from '../../../../lib/prisma';

export default async function handle(req, res) {
    const { email, password, username } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    try {
        const user = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword
            }
        });

        return res.status(200).json({ ...user, password: undefined });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Error signing up user.' });
    }
}
