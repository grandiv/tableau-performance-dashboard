import { randomBytes } from "crypto";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const Tableau_JWT_ClientId = "YOUR_TABLEAU_CLIENT_ID";
const Tableau_JWT_Username = "YOUR_TABLEAU_USERNAME";
const Tableau_JWT_SecretValue = "YOUR_TABLEAU_SECRET_VALUE";
const Tableau_JWT_SecretId = "YOUR_TABLEAU_SECRET_ID";

const generateToken = () => {
  return jwt.sign(
    {
      iss: Tableau_JWT_ClientId,
      sub: Tableau_JWT_Username,
      aud: "tableau",
      jti: randomBytes(64).toString("hex"),
      scp: ["tableau:views:embed", "tableau:metrics:embed"],
    },
    Tableau_JWT_SecretValue,
    {
      algorithm: "HS256",
      expiresIn: 600,
      header: {
        kid: Tableau_JWT_SecretId,
        iss: Tableau_JWT_ClientId,
      },
    }
  );
};

export async function GET(request: NextRequest) {
  const token = generateToken();
  const newHeaders = new Headers(request.headers);
  newHeaders.set("Cache-Control", "no-store");
  NextResponse.next({
    request: {
      headers: newHeaders,
    },
  });
  return NextResponse.json(token);
}
