const jwt = require("jsonwebtoken");
require("dotenv").config();

// פונקציית מיידלוואר / אמצעית
const auth = async (req, res, next) => {
  const token = req.cookies["token"];
  // בודק שנשלח טוקן בהידר
  if (!token) {
    return res.status(401).json({ err: "You need to send a token to this endpoint or URL 111" });
  }

  try {
    // מנסה לפענח את הטוקן אם הוא לא בתוקף
    // או שיש טעות אחרת נעבור לקץ'
    
    const decodedToken = jwt.verify(token, process.env.TokenSecret);
    // נעביר את המידע של הטוקן כמאפיין לריק
    // מכיוון שהמשתנה שלו זהה לחלוטין בזכרון לריק של הפונקציה
    // הבאה בשרשור של הראוטר
    req.tokenData = decodedToken;
    // לעבור בפונקציה הבאה בתור בשרשור של הרואטר
    next();
  } catch (err) {
    console.log(err);
    res.status(502).json({ err: "Token invalid or expired 222" });
  }
};

// Export the auth function directly
module.exports = auth;
