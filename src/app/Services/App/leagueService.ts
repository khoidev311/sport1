import { ResponseDataType } from "@interfaces/Common";
import { LeagueDataType } from "@interfaces/Common/leagueType";

const fakeData = [
  {
    uuid: 1,
    name: "Primier League",
    logo: "https://seeklogo.com/images/P/premier-league-new-logo-D22A0CE87E-seeklogo.com.png",
  },
  {
    uuid: 2,
    name: "Laliga",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOGRAT9_cBRZVyxnwwxDlQk0HuBGLTXtSq8gcTZ7iJxw&s",
  },
  {
    uuid: 3,
    name: "Serie A",
    logo: "https://brandlogos.net/wp-content/uploads/2021/12/serie_a-brandlogo.net_-768x768.png",
  },
  {
    uuid: 4,
    name: "Bundesliga",
    logo: "https://brandlogos.net/wp-content/uploads/2020/09/bundesliga-logo-768x768.png",
  },
  {
    uuid: 5,
    name: "Eredivisie",
    logo: "https://brandlogos.net/wp-content/uploads/2021/12/eredivisie-brandlogo.net_-300x300.png",
  },
  {
    uuid: 6,
    name: "Primeira Liga",
    logo: "https://brandlogos.net/wp-content/uploads/2022/08/liga_portugal-logo_brandlogos.net_lah0i-300x300.png",
  },
  {
    uuid: 7,
    name: "Champion League",
    logo: "https://brandlogos.net/wp-content/uploads/2014/10/uefa_champions_league-logo_brandlogos.net_swjss-300x287.png",
  },
  {
    uuid: 8,
    name: "UEFA League",
    logo: "https://brandlogos.net/wp-content/uploads/2022/02/uefa_europa_league-logo-brandlogos.net_-300x300.png",
  },
  {
    uuid: 9,
    name: "Conference League",
    logo: "https://brandlogos.net/wp-content/uploads/2021/09/uefa-europa-conference-league-logo-300x300.png",
  },
];

const getLeagues = async () =>
  new Promise<ResponseDataType<LeagueDataType[]>>((resolve) => {
    setTimeout(() => {
      resolve({
        data: fakeData,
        meta: {
          total: fakeData.length,
        },
      });
    }, 1000);
  });
export { getLeagues };
