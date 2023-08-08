import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (credentials.email === "test@email.com") {
          return {  };
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

      }
      return token;
    },
    async session({ session, token }) {
      return session;
    }
  }
});

export { handler as GET, handler as POST }