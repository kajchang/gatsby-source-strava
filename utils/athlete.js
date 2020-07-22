var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i]
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key]
        }
      }
    }
    return target
  }

const {strava} = require("./strava.js")

const getAthlete = async ({
  options: {
    withKoms = false,
    withRoutes = false,
    withStats = false,
    withZones = false,
  } = {},
}) => {
  const athlete = await strava.fetch({
    args: {},
    method: {category: "athlete", name: "get"},
  })

  const koms = withKoms
    ? await getAthleteKoms({
        athleteId: athlete.id,
      })
    : null

  const routes = withRoutes ? await getAthleteRoutes() : null

  const stats = withStats
    ? await getAthleteStats({
        athleteId: athlete.id,
      })
    : null

  const zones = withZones ? await getAthleteZones() : null

  const athleteWithOptions = _extends(
    {},
    athlete,
    koms ? {koms} : {},
    routes ? {routes} : {},
    stats ? {stats} : {},
    zones ? {zones} : {}
  )

  return athleteWithOptions
}

const getAthleteZones = () =>
  strava.fetch({
    args: {},
    method: {category: "athlete", name: "listZones"},
  })

const getAthleteRoutes = () =>
  strava.fetch({
    args: {},
    method: {category: "athlete", name: "listRoutes"},
  })

const getAthleteStats = ({athleteId: id}) =>
  strava.fetch({
    args: {id},
    method: {category: "athletes", name: "stats"},
  })

const getAthleteKoms = ({athleteId: id}) =>
  strava.fetch({
    args: {id},
    method: {category: "athletes", name: "listKoms"},
  })

module.exports = getAthlete
