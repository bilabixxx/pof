SUL PROGETTO
L'obbiettivo di questa applicazione è quello di realizzare delle API JSON RESTful che consentiranno di gestire dei gruppi di acquisto.

DESCRIZIONE
L'utente attraverso l'uso del nostro backend potrà  effettuare delle chiamate api al nostro servizio in modo tale da potere aggiungere, modificare, eliminare ed aggiornare prodotti, clienti e ordini.

COME UTILIZZARE L'APPLICAZIONE
L'applicazione non è provvista di nessun front-end, per potere visualizzare, aggiungere, aggiornare e eliminare i dati è consigliabile usare il servizio offerto da Postman.

Il back-end prevedete l'utlizzo di tre path per la manipolazione dei dati:

1. Products;
2. Users;
3. Orders.

PRODUCTS

Per effettuare la manipolazione dei dati dei prodotti bisognerà effettuare le richieste al seguente link:

http://localhost/5000/produts

POST

Per aggiungere un nuovo prodotto bisognerà usare il seguente schema:
IMMAGINE

GET

 Le richieste per la visualizzazione dei prodotti potrà essere fatta in modo generica:
 IMMAGINE 
 o specifica usando (se si conosce) l'id del prodotto
 IMMAGINE
 Il risultato sarà visualizzato in questo modo:
 IMMAGINE


PATCH

Per poter effettuare la richiesta alla modifica di un prodotto, bisognerà prima conoscerne il suo ID:
Lo schema sarà uguale a quello di una chiamata POST.

In caso di successo verrà visualizzato il seguente messaggio:
IMMAGINE

In caso di errore sarà visualizzato questo messaggio:
IMMGINE

DELETE
Per potere effettuare l'eliminazione di un prodotto basterà conoscerne solamente il suo ID:
Visualizzazione in caso di successo:
IMMAGINE

Visualizzazione in caso di errore:
IMMAGINE

USERS

Per effettuare la manipolazione dei dati dei prodotti bisognerà effettuare le richieste al seguente link:

http://localhost/5000/produts

POST

Per aggiungere un nuovo utente bisognerà usare il seguente schema:
IMMAGINE

GET

 Le richieste per la visualizzazione degli utenti potrà essere fatta in modo generica:
 IMMAGINE 
 o specifica usando (se si conosce) l'id dell'utente:
 IMMAGINE
 Il risultato sarà visualizzato in questo modo:
 IMMAGINE


PATCH

Per poter effettuare la richiesta alla modifica di un utente, bisognerà prima conoscerne il suo ID:
Lo schema sarà uguale a quello di una chiamata POST.

In caso di successo verrà visualizzato il seguente messaggio:
IMMAGINE

In caso di errore sarà visualizzato questo messaggio:
IMMGINE

DELETE
Per potere effettuare l'eliminazione di un utente basterà conoscerne solamente il suo ID:
Visualizzazione in caso di successo:
IMMAGINE

Visualizzazione in caso di errore:
IMMAGINE

ORDERS

Per effettuare la manipolazione dei dati degli ordini bisognerà effettuare le richieste al seguente link:

http://localhost/5000/produts

POST

Per aggiungere un ordine prodotto bisognerà usare il seguente schema:
IMMAGINE

GET

 Le richieste per la visualizzazione dei prodotti potrà essere fatta in modo generica o usando il filtro data e nome:
 1. GENERICA
 IMMAGINE 
 1. SPECIFICA
 o specifica usando (se si conosce) l'id del prodotto
 IMMAGINE
3. USANDO IL FILTRO

IAMMMGINE




PATCH

Per poter effettuare la richiesta alla modifica di un prodotto, bisognerà prima conoscerne il suo ID:
Lo schema sarà uguale a quello di una chiamata POST.

In caso di successo verrà visualizzato il seguente messaggio:
IMMAGINE

In caso di errore sarà visualizzato questo messaggio:
IMMGINE

DELETE
Per potere effettuare l'eliminazione di un prodotto basterà conoscerne solamente il suo ID:
Visualizzazione in caso di successo:
IMMAGINE

Visualizzazione in caso di errore:
IMMAGINE

APPLICATION DEPENDENCIES

    "cors": "^2.8.5",
        "dotenv": "^16.0.1",
        "express": "^4.18.1",
        "moment": "^2.29.3",
        "mongoose": "^6.3.4"
 

 CONTATTI