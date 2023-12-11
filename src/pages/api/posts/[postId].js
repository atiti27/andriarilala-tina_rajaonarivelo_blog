import mw from "@/api/mw"

const handle = mw({
  GET: [],
  PATCH: [],
  DELETE: [], // Pas sûr d'après le cahier des charges
})

export default handle

// Ne pas oublier les kpis (visits per post) pour le dashboard
