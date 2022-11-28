
const token = "996e986514754a2799898dcec074158a"
const baseUrl = "https://api.football-data.org/v4/competitions/2000"

function getStandings()
{
    const url = `${baseUrl}/standings`

    axios.get(url, {
        headers: {
            "X-Auth-Token": token
        }
    })
    .then((response) => {
        document.getElementById("groups").innerHTML = ""

        const standings = response.data.standings
        
        for(standing of standings)
        {
            let tableContent = ""

            for(row of standing.table){
                tableContent += `
                <!-- Team row -->
                        <li class="list-group-item">
                        
                            <div class="row">
                                <div class="col-sm-3 center d-flex justify-content-center align-items-center">
                                    <span class="flag">
                                        <img class="shadow" src="${row.team.crest}">
                                    </span>
                                    <h5 class="flag">${row.team.tla}</h5>
                                </div>

                            <div class="col-sm-1 center">
                                ${row.playedGames}
                            </div>

                            <div class="col-sm-1 center">
                                ${row.won}
                            </div>

                            <div class="col-sm-1 center">
                                ${row.draw}
                            </div>
                            <div class="col-sm-1 center">
                                ${row.lost}
                            </div>

                            <div class="col-sm-1 center">
                                ${row.goalsFor}
                            </div>

                            <div class="col-sm-1 center">
                                ${row.goalsAgainst}
                            </div>

                            <div class="col-sm-1 center">
                                ${row.goalDifference}
                            </div>

                            <div class="col-sm-2 center">
                                ${row.points}
                            </div>
                            </div>
                          </li>
                          <!-- & End Team row -->
                `
            }

            const content = `
            
            <!-- Group col -->
            <div class="col-sm-6 mb-4">
                <div class="card shadow border-none">
                    <div class="card-header bg-primary center">
                      <b>${standing.group}</b>
                    </div>

                    <div class="row m-0 bg-secondary">
                        <div class="col-sm-3 center">team</div>

                        <div class="col-sm-1 center">
                            P
                        </div>

                        <div class="col-sm-1 center">
                            W
                        </div>

                        <div class="col-sm-1 center">
                            D
                        </div>

                        <div class="col-sm-1 center">
                            L
                        </div>

                        <div class="col-sm-1 center">
                            Gs
                        </div>

                        <div class="col-sm-1 center">
                            Ga
                        </div>

                        <div class="col-sm-1 center">
                            +/-
                        </div>

                        <div class="col-sm-2 center">
                            points
                        </div>
                    </div>

                    <!-- Teams -->
                    <ul class="list-group list-group-flush">
                        ${tableContent}
                    </ul>
                    <!-- &End Teams -->
                  </div>
            </div>
            <!-- & End Group col -->

            `

            document.getElementById("groups").innerHTML += content
        }
    
    })
}

function getMatches()
{
const url = `${baseUrl}/matches`

console.log(url, token)
axios.get(url, {
    headers: {
        "X-Auth-Token": `${token}`
    }
})
.then((response) => {
    const matches = response.data.matches
    
    document.getElementById("matches").innerHTML = ""

    for(match of matches)
    {
        const homeTeam = match.homeTeam
        const awayTeam = match.awayTeam

        if(homeTeam.name == null)
        {
            continue
        }

        const comp = match.competition
        const dateUtc = match.utcDate
        const matchTime = new Date(dateUtc)
        const dateString = matchTime.getUTCFullYear() +"/"+ (matchTime.getUTCMonth()+1) +"/"+ matchTime.getUTCDate() + " " + matchTime.getUTCHours() + ":" + matchTime.getUTCMinutes() + ":" + matchTime.getUTCSeconds()
        

        
        const content = `
            <!-- MATCH COL -->
            <div class="col-lg-12" >
                <div class="card shadow rounded-pill mt-5" style="overflow: hidden">                            
                    <!-- MATCH CARD -->
                    <div class="card-body p-0">
                        <div class="row">
                            <!-- FIRST TEAM COL -->
                            <div class="col-lg-3 bg-primary d-flex flex-direction-column justify-content-center align-items-center" style="border-right: solid 5px #5b0d25;">
                                <div class="d-flex align-items-center justify-content-center" style="text-align: center; margin: auto 0">
                                
                                    <div>
                                        <div class="flag">
                                            <img 
                                                class="border border-2" 
                                                src="${homeTeam.crest}" 
                                                alt=""
                                                style="width: 12vp; height: 9vp; object-fit: cover"
                                            >
                                        </div>
                                        <h5 style="margin:auto 4px">${homeTeam.tla}</h5>
                                    </div>
                                </div>
                            </div>
                            <!--// FIRST TEAM COL //-->
                            <!-- VERSUS COL -->
                            <div class="col-lg-6" style="text-align: center">
                                <div class="row">
                                    <div class="col-lg-4" style="margin: auto 0px">
                                        <h3>
                                            ${match.score.fullTime.home ?? '-'}
                                        </h3>
                                    </div>
                                    <div class="col-lg-4">
                                        <h6>${match.group}</h6>
                                        <h1>X</h1>                                        
                                        <h6>${dateString}</h6>
                                    </div>
                                    <div class="col-lg-4" style="margin: auto 0px">
                                        <h3>
                                            ${match.score.fullTime.away ?? '-'}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <!--// VERSUS COL //-->
                            <!-- SECOND TEAM COL -->
                            <div class="col-lg-3 bg-primary d-flex flex-direction-column justify-content-center align-items-center" style="border-left: solid 5px #5b0d25;">
                                <div class="d-flex align-items-center justify-content-center" style="text-align: center; margin: auto 0">
                                
                                    <div>
                                        <div class="flag">
                                            <img 
                                                class="border border-2" 
                                                src="${awayTeam.crest}" 
                                                alt=""
                                                style="width: 12vp; height: 9vp; object-fit: cover"
                                            >
                                        </div>
                                        <h5 style="margin:auto 4px">${awayTeam.tla}</h5>
                                    </div>
                                </div>
                            </div>
                            <!--// SECOND TEAM COL //-->
                        </div>
                    </div>
                    <!--// MATCH CARD //-->
                </div>
            </div>
            <!--// MATCH COL //-->
            
        `
        document.getElementById("matches").innerHTML += content
    }
})
}
getStandings()
getMatches()