# Twitch-analyser-job
Job analysing twitch traffic.


# Redis Time Series
Cant save labels with spaces

# Como modelar los datos para las time series
- key=stream:streamerId(111):catId(23123):jugando x, Date, 999 LABEL[streamId=111]
- key=stream:streamerId(111):catId(23123):charlando con J, Date, 999 LABEL[streamId=111]

En la key debo definir todos los campos que puedan ser susceptibles de ser mutados, con los que no.
Por ejemplo
  - StreamerId (CONST)
  - StreamId (CONST)
  - TitleStream (MUT)

De esta forma lo que puedo conseguir es poder lanzar queries filtrando por 
StreamId (que es lo realmente interesante) y poder discernir entre los cambios de
juego o titulo, para ello es muy importante pedir las respues "WITHLABELS"

.mrange(key, timeSTART, timeEND)
  .filter([
    Filter.equal('StreamerId', <EL STREAM QUE ME INTERESA>),
  ])
  