import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const client = await clientPromise;
        const db = client.db();
        const hrProfile = await db.collection("hr_profiles").findOne({ email: credentials.email });
        
        if (hrProfile && bcrypt.compareSync(credentials.password, hrProfile.password)) {
          return hrProfile;
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: "/Login"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.name = user.name;
        token.email = user.email;
        token.phone = user.phone;
      }
      return token;
    },
    async session({ session, token }) {
      session.user._id = token._id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.phone = token.phone;
      return session;
    }
  }
});

export { handler as GET, handler as POST }