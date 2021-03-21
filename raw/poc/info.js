let request=require("request");
let cheerio=require("cheerio");
let fs=require("fs");
let path=require("path");

// Mkdir is doesnt exi...
if(!fs.existsSync(path.join(process.cwd(),"IPL2020")))
    fs.mkdirSync(path.join(process.cwd(),"IPL2020"));

let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595"
request(url,cb1);
function cb1(err,cont, html)
{
    let $=cheerio.load(html);
    let tables=$(".card.content-block.w-100.sidebar-widget .table.table-sm.sidebar-widget-table.text-center.mb-0")
    let allAnc=$(tables).find("tbody tr a");
    // console.log(tr.length);
    for(let i=0;i<allAnc.length;i++)
    {
        let oneLink="https://www.espncricinfo.com/"+$(allAnc[i]).attr("href");
        console.log(oneLink);
        request(oneLink,cb2)
       
    }
}


function cb2(err,cont,html)
{
    if(err)
    {
        console.log("Not");
    }
    let $=cheerio.load(html);
    let result=$(".navbar.navbar-expand-lg.sub-navbar .navbar-nav .nav-item a")
    let url="https://www.espncricinfo.com/"+$(result[1]).attr("href");
    console.log(url);
    request(url,cb3);
}

function cb3(err,cont,html)
{
    let $=cheerio.load(html);
    let anc=$(".widget-tabs.team-scores-tabs a");
    let resLink="https://www.espncricinfo.com/"+$(anc[1]).attr("href");
    //Name of Current Team
    let name=$(".header-title.label").text().trim();
    

    console.log(name," dfewfeeeeeeeeeeeeeeeee");
    let pathTill=path.join(process.cwd(),"IPL2020");
    if(!fs.existsSync(path.join(pathTill,name)))
        fs.mkdirSync(path.join(pathTill,name)); 
      
    request(resLink,function cb4(err,cont,html)
    {
        let $=cheerio.load(html);
        let allBoxes=$(".match-info-link-FIXTURES");
        for(let i=0;i<allBoxes.length;i++)
        {
            let oneLink="https://www.espncricinfo.com/"+$(allBoxes[i]).attr("href");
            
            console.log(oneLink);
             request(oneLink,function cb5(err,cont,html)
             {
                 if(err|| html=="")
                 {
                     console.log(err);
                 }
                 let $=cheerio.load(html);
                 //date ,venue ,result and opponent name for that match
                let disc=$(".match-header .description").text().split(",");
                let BothTeams=$(".match-header .teams .name-detail");
                let date=disc[2];
                let venue=disc[1];
                let opponent= ($(BothTeams[0]).text().trim()==name?$(BothTeams[1]).text().trim():$(BothTeams[0]).text().trim());
                let winnningTeam=$(".match-header .teams .team.team-gray .name-detail").text()==$(BothTeams[0]).text().trim()?$(BothTeams[1]).text().trim():$(BothTeams[0]).text().trim();
                console.log(winnningTeam);
                console.log(date);
                console.log(venue);
                console.log(opponent);

                let twoTables=$(".match-scorecard-page .card.content-block.match-scorecard-table");
                console.log(twoTables.length);
                for(let i=0;i<twoTables.length-1;i++)
                {
                    
                    let teamName=$(twoTables[i]).find(".header-title.label").text().split("INNINGS");
                    console.log(teamName[0].trim(),name.trim());

                    if(teamName[0].trim()==name.trim())
                    {
                        let batsmen=$(twoTables[i]).find(".table.batsman tbody tr");
                        for(let j=0;j<batsmen.length;j++)
                        {
                            let rowsOfOneBatsmen=$(batsmen[j]).find("td");
                            if(rowsOfOneBatsmen.length==8)
                                {
                                    let details= $(rowsOfOneBatsmen);
                                    let obj={
                                        Name:$(details[0]).text().trim(),
                                        Runs:$(details[2]).text(),
                                        Balls:$(details[3]).text(),
                                        Fours:$(details[5]).text(),
                                        Sixes:$(details[6]).text(),
                                        SR:$(details[7]).text(),
                                        Date:date,
                                        Opponent:opponent,
                                        Venue:venue,
                                        Result:winnningTeam+"Won.",
                                    }
                                    console.log(obj);    
                                    let fileName=$(details[0]).text().trim();
                                    let jsonPath=path.join(pathTill,name);
                                    let pt=MakeJsonFile(fileName,jsonPath,obj);   
                                }   
                        }
                    }
                        


                }
                
             });
            
        }
    
    });
}

function MakeJsonFile(name,path1,obj)
{
    let pt=path.join(path1,name+".json");
    let arr;
    if(!fs.existsSync(pt))
       { 
           fs.openSync(pt,"w");
            arr=[];
            arr.push(obj);
       }
       else{
           content=fs.readFileSync(pt);
           arr=JSON.parse(content);
           arr.push(obj);
       }
    let contentinFile=JSON.stringify(arr);
    fs.writeFileSync(pt,contentinFile);
    return pt;
}

