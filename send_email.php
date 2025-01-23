<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    $to = "morgenstern.emma@outlook.fr"; // Remplacez par votre adresse email
    $headers = "From: " . $email . "\r\n" .
               "Reply-To: " . $email . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    $body = "Nom: $name\nEmail: $email\nSujet: $subject\n\nMessage:\n$message";

    if (mail($to, $subject, $body, $headers)) {
        echo "<script>alert('Votre message a été envoyé avec succès!'); window.location.href = 'index.html';</script>";
    } else {
        echo "<script>alert('Erreur lors de l\'envoi du message.'); window.location.href = 'index.html';</script>";
    }
} else {
    header("Location: index.html");
    exit();
}
?>