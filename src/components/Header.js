import React from 'react';

export default function Header() {
  return (
    <div className="row border-bottom">
      <nav
        className="navbar navbar-static-top  "
        role="navigation"
        style={{ marginBottom: 0 }}
      >
        <div className="navbar-header">
          <a
            className="navbar-minimalize minimalize-styl-2 btn btn-primary "
            href="/"
          >
            <i className="fa fa-bars" />
          </a>
        </div>
        <ul className="nav navbar-top-links navbar-right">
          <li>
            <a data-toggle="dropdown" className="dropdown-toggle" href="/">
              Organizacja:
              <strong>Sąd Okręgowy w Mieście</strong> <b className="caret" />
            </a>
            <ul className="dropdown-menu fadeInRight">
              <li>
                <a href="/uzytkownik/wybierz-organizacje/?organizacja=6">
                  Sąd Okręgowy w Mieście
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a data-toggle="dropdown" className="dropdown-toggle" href="/">
              <strong className="font-bold">Rafał Piaśnik</strong>
              <b className="caret" />
            </a>
            <ul className="dropdown-menu fadeInRight m-t-xs">
              <li>
                <a href="/uzytkownik/zmien-haslo/" title="Zmień hasło">
                  Zmień hasło
                </a>
              </li>
              <li className="divider" />
              <li>
                <a href="/uzytkownik/logout/" title="Wyloguj się">
                  Wyloguj się
                </a>
              </li>
            </ul>
          </li>
          <li className="dropdown">
            <a
              className="dropdown-toggle count-info"
              data-toggle="dropdown"
              href="/"
            >
              <i className="fa fa-envelope" />
              <span
                id="id_powiadomienia_liczba"
                className="label label-primary"
                style={{ display: 'none' }}
              />
            </a>
            <ul className="dropdown-menu dropdown-alerts" id="id_powiadomienia">
              <li>
                <div className="text-center link-block">
                  <a href="/organizacja/powiadomienie/">
                    <strong>
                      Zobacz wszystkie powiadomienia
                      <i className="fa fa-angle-right" />
                    </strong>
                  </a>
                </div>
              </li>
            </ul>
          </li>
          <li className="dropdown">
            <a
              className="dropdown-toggle count-info"
              data-toggle="dropdown"
              href="/"
            >
              <i className="fa fa-bell" />
              <span
                id="id_powiadomienia_zadania_liczba"
                className="label label-warning"
                style={{ display: 'none' }}
              />
            </a>
            <ul
              className="dropdown-menu dropdown-alerts"
              id="id_powiadomienia_zadania"
            >
              <li>
                <div className="text-center link-block">
                  <a href="/workflow/index/">
                    <strong>
                      Zobacz wszystkie zadania{' '}
                      <i className="fa fa-angle-right" />
                    </strong>
                  </a>
                </div>
              </li>
            </ul>
          </li>
          <li>
            <a data-toggle="dropdown" className="dropdown-toggle" href="/">
              <i className="fa fa-life-ring" /> Pomoc <b className="caret" />
            </a>
            <ul className="dropdown-menu fadeInLeft m-t-xs">
              <li>
                <a href="/pomoc/" title="Baza Wiedzy">
                  Instrukcje / baza wiedzy
                </a>
              </li>
              <li>
                <a href="/pomoc/aktualnosci/" title="Aktualności ABI Online">
                  Aktualności
                </a>
              </li>
              <li>
                <a
                  rel="noreferrer"
                  href="https://www.abionline.pl/pomoc?email=r.piasnik@gmail.com&firstname=Rafał&lastname=Piaśnik"
                  target="_blank"
                  title="Pomoc"
                >
                  Skontaktuj się z nami
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}
