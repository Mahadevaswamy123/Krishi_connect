import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { token, password } = req.body;

    try {
      // Validate the token
      const resetToken = await prisma.passwordResetToken.findUnique({
        where: { token },
        include: { user: true },
      });

      if (!resetToken) {
        return res.status(400).json({ error: "Invalid or expired token" });
      }

      // Check if token is expired
      if (new Date() > new Date(resetToken.expiredAt)) {
        return res.status(400).json({ error: "Token has expired" });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update the user's password
      await prisma.user.update({
        where: { id: resetToken.userId },
        data: { password: hashedPassword },
      });

      // Delete the reset token from the database
      await prisma.passwordResetToken.delete({
        where: { token },
      });

      return res.status(200).json({ message: "Password has been reset" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
