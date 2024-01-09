# CodeCooks
Projektni zadatak u sklopu predmeta "Programsko inžinjerstvo"

Link aplikacije na renderu: https://cookbooked-codecooks-aplikacija.onrender.com

Link backenda na renderu: https://cookbooked-codecooks-backend.onrender.com

Napomena:
Na našu iskrenu žalost, prilikom registracije i prijave, response ne radi ispravno te u zadanom roku nismo uspjeli otkloniti problem.
Prilikom registracije, spajanjem na bazu može se uočiti dodani zapis što potvrđuje samu ispravnu vezu frontend->backend->baza uz uvjet da su username i email unique.
Dokumentacija je sva potpuno ispunjena za prvu predaju.
Što se tiče samog problema na frontendu, uočio sam da kada u fetch(url).then(  Ovdje ) stavim samo alert, on se prikazuje,
dok kada stavim if (!response.ok) alert () tada ne prikazuje alert.

Za potrebe spajanja na web bazu putem pgadmin, podatci za spajanje su sljedeci:

hostname: dpg-cl5s4bd6fh7c73eueupg-a </n>
baza: bazapodataka </n>
url: postgres://dpg-cl5s4bd6fh7c73eueupg-a.frankfurt-postgres.render.com/bazapodataka </n>
username: user </n>
lozinka: LbF9501ZSTOoGMZuFJK6fMDyRYspdyLx </n>
