Bachelorthesis - Medieninformatik (Bachelor of Science)

[@TUBerlin](https://www.eecs.tu-berlin.de/menue/studium_und_lehre/studiengaenge/medieninformatik/medieninformatiktu_fu_hu_berlin) & [@Bosch](https://www.bosch.com/de/produkte-und-services/vernetzte-produkte-und-services/connected-mobility/)

Stefan Thiele

## Titel: Analyse von Qualitätseigenschaften für Softwarearchitekturen am Beispiel vom intermodalen Routing

### 1. Einleitung - Motivation 
Wie sieht die urbane Mobilität von Morgen aus? Viele Städte stellen sich diese Frage. Denn nicht nur das wachsende Verkehrsaufkommen und die Verkehrsleistung spielen im urbanen Raum eine tragende Rolle, sondern auch die vermehrten Mobilitätsdienstleister, welche den Verkehr von Morgen in Städten verschlanken soll [1]. Die allgemeine Durchschnittsgeschwindigkeit im urbanen Raum sinkt. Berufspendler stecken schon heute früh am Morgen stundenlang im Stau und hoffen ihren Arbeitsplatz noch pünktlich zu erreichen [2]. Neben dem öffentlichen Personennahverkehr befinden sich etliche Mobilitätsdienstleister auf den Straßen. Car-Sharing, Ride-Hailing, Bike-Sharing, Scooter-Sharing sind nur einige, welche sich neben dem gewöhnlichen Verkehr, auf den Straßen der Städte treiben. Ziel ist es dieses massive Aufkommen effizient verteilt und genutzt zu bekommen, so dass Staus und Verspätungen der Vergangenheit angehören. Auch Zugunsten der Umwelt. Die Vernetzung vom öffentlichen Personennahverkehr und den neuen Mobilitätsdienstleistungen zeigen bereits heute bei der multimodalen Routenempfehlung mehrere Mobilitätsmöglichkeiten um vom Start zum Ziel zu gelangen.
Mono- und Multimodalität sind die beiden üblichen Möglichkeiten der Mobilität. Monomodalität beschränkt sich auf die Nutzung eines der verfügbaren Verkehrsmittel, wobei die „Voraussetzung für das Vorliegen von Multimodalität ist die Nutzung verschiedener Verkehrsmittel innerhalb einer Zeit.“ [3]. Google, WHIM und Jelbi sind Beispiele für die multimodale Routenempfehlung. Diese Anbieter schlagen dem Nutzer vor, wie sie ihr Ziel erreichen können und das möglichst multimodal, d.h. das dem Nutzer mehrere Möglichkeiten unterbreitet werden. Eine weitere Möglichkeit der Routenempfehlung ist die Intermodalität.
Intermodalität ist eine Kombination und Vernetzung aus den zuvor genannten Mobilitätsanbietern, um von A nach B zu gelangen. Unter Ausnutzung der verschiedensten Verkehrsmittel das gewünschte Ziel zu erreichen ist die Definition von Intermodalität, um für die Nutzer die kostengünstigste und schnellste Verbindung aufzuzeigen [4].
Die Abbildung 1 verdeutlicht durch zwei Beispiele die intermodale Reiseempfehlung um von einem Startpunkt zum gewünschten Ziel zu gelangen.
Die technische Umsetzung ist dort schon schwieriger. Das Zusammenspiel, genauer die Interoperabilität, das Zusammenspiel der verschiedenen Schnittstellen, ist die eigentliche Schwierigkeit. Um intermodal zu reisen, bedarf es einer nahtlosen Kommunikation verschiedenster Systemen, so dass schließlich eine intermodale Routenempfehlung gegeben werden kann. Es stellt sich ebenfalls die Frage, wie konsistent die jeweiligen Systeme sind, wenn sich zum Beispiel eine Baustelle auf der Route befindet.

![IM](https://github.com/telky/bachelorthesis/blob/master/misc/im_example.png)

Abbildung 1: Beispiele intermodaler Routen. Route 1 mittels öffentlicher Verkehrsmittel und dem Gebrauch eines Leihfahrrades. Route 2 zeigt hingegen ein Mix aus Individualverkehr, P+R, ÖPNV und Ride-Hailing.

Mittels von Lasttests sollen in dieser Arbeit verschiedene intermodale Routing Systeme analysiert werden.

### 2. Wissenschaftliche Frage
Diese Bachelorarbeit soll zwei bekannte Architekturen vergleichen, die für die intermodale Reiseempfehlung verwendet werden können. Auf der einen Seite die Architektur der Open Source Software - Open Trip Planner und auf der anderen Seite die einer nahtlosen Kombination von bestehenden Services. Die wissenschaftliche Frage dieser Bachelorthesis ist **„Wie beeinflussen die unterschiedlichen Architekturen die Qualitätseigenschaften für intermodales Routing?“**
Wobei die folgenden Hypothesen die wissenschaftliche Frage stützen sollen:
1. Wie portabel sind die beiden Architekturen, sofern sie in einer anderen Routenumgebung ausgerollt werden sollen?
2. Wie konsistent sind die Architekturen, wenn kurzfristig Änderungen im Straßenverkehr auftauchen, wie z.B. eine Baustelle?
3. Wie performant sind die einzelnen Architekturen in einem Lasttest?

### 3. Stand der Technik
Routenempfehlungen können, wie in der Einleitung bereits erwähnt, mono- oder multimodal gestellt werden. Unter Berücksichtigung von Point of Interests3, welche bei der Routenplanung Infrastrukturen wie Bike and Ride, Park and Ride und Parkhäusern sind, werden Routen intermodal berechnet, wobei letztendlich immer ein Restfußweg besteht. Die folgenden beiden Architekturen werden Bestandteil dieser Arbeit sein, um ein Benchmark hinsichtlich deren Qualität, genauere Erläuterung im Abschnitt „Beitrag“, zu ziehen.

### 3.1 Open Trip Planner
Der Open Trip Planner (OTP) ist eine Open Source Software zur multi- und intermodalen Routenberechnung. Das Kartennetz bezieht sich der OTP aus den Daten von Open Street Map4. Zusätzliche Fahrpläne und –netze generieren sich durch GTFS5-Daten. Somit ermöglicht der Open Trip Planner die Routenberechnung für mehrere Verkehrsmittel, einschließlich Fußweg, mit dem Fahrrad, mit dem Personennahverkehr, oder in Kombination mit anderen Verkehrsmitteln. Der Standardalgorithmus im OTP ist der A*-Algorithmus. Dieser berechnet den kürzesten Pfad zwischen zwei Knoten in einem Graphen. Die abstrakte Architektur des OTP veranschaulicht die Abbildung 2. Der OTP besteht aus zwei Komponenten, einer Programmierschnittstelle (API) und einer Webanwendung, die die API über RESTful-Dienste miteinander verbindet. Die API lädt die Grafik Kartennetzes und berechnet die Routen. Die Webanwendung bietet eine interaktive, browserbasierte Benutzeroberfläche mit einer Kartenansicht [5]. Ein Nutzer des OTP kann eine Routenanfrage bei der Selektion des Start- und Zielpunktes auf der Karte beginnen.

![OTP](https://github.com/telky/bachelorthesis/blob/master/misc/OTP.png)

Abbildung 2: Abstrakte Architektur des Open Trip Planners, welcher sich mittels des Kartenmaterials von Open Street Map (OSM) und GTFS Daten zu einem multimodalen Routenplaner entwickelt.

### 3.2 Intermodaler Service
Der intermodale Service, wie in der Abbildung 3 zu erkennen, kombiniert alle angefragten Schnittstellen, wie die des Individualverkehrs, Personenverkehrs und weitere Schnittstellen, wie z.B. Point-of-Interests für Bike and Ride, Park and Ride und Parkhäusern. Das Kartennetz wird dabei bei verschiedenen Providern angefragt. Je nach Anfrage wird der zu erwartende Service angesprochen. Der Routing Service dient somit als Broker. Diese Architektur abstrahiert die Funktion einer intermodalen Routenberechnung, heruntergebrochen auf deren Services. Wie beim OTP verwendet der intermodale Service den A*-Algorithmus.

![IM-Service](https://github.com/telky/bachelorthesis/blob/master/misc/im_service.png)

Abbildung 3: Abstrahierte Architektur eines möglichen intermodalen Service, für die Stadt Berlin, welcher auf Services des Individualverkehrs, Personenverkehrs und Point-of-Interest zurückgreift und somit als Schnittstelle fungiert.

### 4. Beitrag
Die Betrachtung der beiden abstrahierten Architekturen des Open Trip Planners und des Intermodalen Services sollen Grundlage dieser Arbeit sein. Beide Architekturen werden hinsichtlich ausgewählter Qualitätsmerkmale verglichen.
`„Ein Qualitätsmerkmal ist ein Satz von Eigenschaften eines Softwareprodukts, anhand dessen seine Qualität beschrieben und beurteilt wird. Ein Softwarequalitätsmerkmal kann über mehrere Stufen in Teilmerkmale verfeinert werden [6].“`
Die Abbildung 4 zeigt alle identifizierbaren softwaretechnischen Qualitätsmerkmale, wobei in dieser Arbeit gezielte Qualitätsmerkmale gewählt und somit nicht alle Merkmale berücksichtigt werden. Einen genaueren Abriss der obergeordneten Qualitätsmerkmale liefert die ISO/IEC 9126 nach.

![Quality](https://github.com/telky/bachelorthesis/blob/master/misc/quality.png)

Abbildung 4: Grundlage der Softwarequalität ist der Qualitätsbaum aus Böhm [7].

Die nahtlose Zusammenarbeit oder Interaktion, ohne jegliche Einschränkungen, mit anderen Schnittstellen oder Software ist Interoperabilität. Die Interoperabilität soll in beiden Architekturen untersucht werden. Welche Dienste, Services oder statische Daten werden in anderen urbanen Räumen benötigt, um dort intermodales Routen zu ermöglichen? Diese Frage wird beantwortet, in dem die Portierbarkeit der beiden Architekturen ermittelt wird. Der Begriff der Interoperabilität lässt sich in drei Begriffe zergliedern: technische, syntaktische und semantische Interoperabilität [10]. Dahingehend werden die beiden ausgewählten Architekturen auch untersucht. Wie bereits angedeutet wird die Performanz mit einem Lasttest evaluiert. Wohingegen die Konsistenz auf verschiedene Szenarien hin untersucht wird, sofern auf den Routen spontane Änderungen eintreten, wie zum Beispiel eine Baustelle oder Verkehrsstau.
Aufgrund dessen, dass beide Architekturen den identischen A*-Algorithmus verwenden, entfällt hier ein Vergleich.

### 5. Verwandte Arbeiten
Die unterschiedlichen Mobilitätsmodalitäten, sei es mono-, multi- oder intermodale Mobilität, wurden bereits definiert. Die größte Überschneidung im Kontext von der Verknüpfung mehrfacher Mobilitätsanbieter hat die multimodale zur intermodalen Routenempfehlung, wobei hier ein wissenschaftliches Paper [4] Definitionen vorschlägt. Die Fallstudie [8] versucht einen Einblick in die Mobilität der Zukunft und Dringlichkeit in das Thema der urbanen Mobilität zu geben. Ein erstes Pilotprojekt in der Stadt Wien [9], aus dem Jahr 2004, zeigt, dass intermodales Reisen von Interesse ist und den urbanen Raum nachhaltig verändern kann. Angelehnt an der Dissertation von Strang [10] soll die Interoperabilität untersucht werden, sowie die Erweiterbarkeit der Architekturen. Des Weiteren gehört zum Benchmark die Konsistenz und die Performanz.

### 6. Literaturverzeichnis
**[1]** Markus Schubert, Intraplan Consult GmbH: Verflechtungsprognose 2030. Bundesministerium für Verkehr und digitale Infrastruktur, 2014.

**[2]** Deutsche Gesellschaft für internationale Zusammenarbeit (GIZ) GmbH: Urbane Mobilität – Strategien für lebenswerte Städte. Bundesministerium für wirtschaftliche Zusammenarbeit und Entwicklung, 2016.

**[3]** Claudia Nobis: Dissertationsschrift: Multimodale Vielfalt: Quantitative Analyse multimodalen Verkehrshandelns, Seite 20. HU Berlin. 2017.

**[4]** Kathrin Viergutz, Benedikt Scheier: Inter, Multi, Mono: Modalität im Personenverkehr. Eine Begriffsbestimmung. DLR, 2018.

**[5]** T. Liebig, N. Piatkowski, C. Bockermann und K. Morik: Route Planning with Real-Time Traffic Predictions. Proceedings of the 16th LWA Workshops, Seiten 83-94. KDML, IR und FGWM, 2014.

**[6]** Joint Technical Committee ISO/IEC JTC 1, Information technology, Subcommittee SC 7,Software Engineering: ISO/IEC 9126-1:2001 Software engineering – Product quality – Part 1: Quality model. International Organization for Standardization and International Electrotechnical Commission, 2001.

**[7]** Boehm, Barry W., John R. Brown und Mlity Lipow: Quantitative evaluation of software quality. Proceedings of the 2nd international conference on Software engineering. IEEE Computer Society Press, 1976.

**[8]** Peterwerth K., Bolz L., Teichmann N., Göing B., Sonmez Neslihan A.: Urban Mobility 2030: How cities can realize the economic effects. McKinsey&Company, 2016.

**[9]** Rehrl Karl, Rieser Harald, Bruntsch Stefan: Situationsbezogene, integrierte Reiseunterstützung für intermodale Reisen. Vienna-Spirit, 2004.

**[10]** Thomas Strang: Dissertationsschrift: Service-Interoperabilität in Ubiquitous Computing Umgebungen. LMU München. 2003.
