<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Vérifier le champ honeypot
    if (!empty($_POST['_gotcha'])) {
        // Si le champ honeypot est rempli, c'est probablement un bot, on arrête ici.
        die("Accès non autorisé.");
    }

    // Récupérer et valider les données du formulaire
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $subject = htmlspecialchars(trim($_POST['subject']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Vérification basique de l'email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Adresse email invalide.");
    }

    $to = "morgenstern.emma@outlook.fr"; // Remplacez par votre adresse e-mail
    $subject = "Nouveau message de $name - $subject";
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Corps de l'email
    $body = "Vous avez reçu un nouveau message :\n\n";
    $body .= "Nom : $name\n";
    $body .= "Email : $email\n";
    $body .= "Sujet : $subject\n\n";
    $body .= "Message :\n$message\n";

    // Envoi de l'email
    if (mail($to, $subject, $body, $headers)) {
        echo "Votre message a été envoyé avec succès.";
    } else {
        echo "Une erreur s'est produite lors de l'envoi de votre message.";
    }
} else {
    echo "Méthode non autorisée.";
}
?>
