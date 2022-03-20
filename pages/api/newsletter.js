function handler(req, rest) {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes("@")) {
      rest.status(422).json({ message: "Invalid email address." });
      return;
    }
    console.log(userEmail);
    rest.status(201).json({ message: 'Sign up!'});
  }
}

export default handler;
