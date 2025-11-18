<?php
// Optional: session_start(); // Only needed if showing session data
// Optional error message display:
// $error = isset($_GET['error']) ? $_GET['error'] : "";
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to the Store!</title>
  <link rel="stylesheet" href="dist/pos.css">
</head>

<body class="bg-[var(--color-bg)] text-gray-800 font-sans flex flex-col min-h-screen">

  <!-- HEADER -->
  <header class="header py-4 shadow-md">
    <div class="container mx-auto flex justify-between items-center">

      <div class="flex items-center gap-3">
        <img src="images/logo.png" alt="Welcome" class="h-12 object-contain">
      </div>

    </div>
  </header>

  <!-- MAIN -->
  <main class="flex-1 flex flex-col justify-center items-center text-center px-4">

    <h2 class="text-3xl font-semibold text-gray-900 mb-2">Welcome to our online Store!</h2>
    <p class="text-gray-600 mb-6">First-time customers must make an account.</p>

    <a href="Create an account page.php" class="btn btn-primary mb-10">Sign Up</a>

    <h3 class="text-xl font-semibold mb-2">Returning? Sign in and make your purchases!</h3>

    <!-- LOGIN FORM (now working with backend) -->
    <form action="login.php" method="POST" class="bg-white shadow-soft rounded-xl p-8 w-full max-w-sm">

      <div class="form-group">
        <label for="username" class="label">Username</label>
        <input 
            id="username" 
            name="username" 
            type="text" 
            class="input" 
            placeholder="Enter your username" 
            required>
      </div>

      <div class="form-group">
        <label for="password" class="label">Password</label>
        <input 
            id="password" 
            name="password" 
            type="password" 
            class="input" 
            placeholder="Enter your password" 
            required>
      </div>

      <button 
          type="submit"
          class="btn btn-primary w-full mt-2">
          Sign In
      </button>

    </form>

  </main>

  <!-- FOOTER -->
  <footer class="footer">
    Team 7
  </footer>

</body>
</html>
