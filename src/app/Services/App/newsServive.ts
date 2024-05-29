import { NewsCategoryEnum } from "@enums/commonEnum";
import { ResponseDataType } from "@interfaces/Common";
import { NewsDataType } from "@interfaces/Common/newsType";

const fakeDataNews = [
  {
    title:
      "Xabi Alonso: Uli Hoeness says Bayern Munich, Liverpool and Real Madrid working on deal to appoint Spaniard",
    description:
      "Bayern Munich and Liverpool both looking for new managers this summer; Sky in Germany claim Bayern have opened discussions with Bayer Leverkusen boss Xabi Alonso; the ex-Liverpool midfielder is also reportedly a target for the Reds as they search for Jurgen Klopp's successor",
    img: "https://e0.365dm.com/24/03/1600x900/skysports-xabi-alonso-bayer-leverkusen_6496676.jpg?20240321111529",
  },
  {
    title: "Premier League rule change to prevent ball boys and girls handing match ball back to players",
    description:
      "Premier League to introduce rule change from this weekend onwards; feedback from clubs and match officials has prompted the change; ball boys and girls must now place the match ball on cones around the pitch, rather than handing them directly to players",
    img: "https://e0.365dm.com/24/03/1600x900/skysports-divock-origi-liverpool_6503762.jpg?20240328205414",
  },
  {
    title:
      "Barcelona 3-1 Brann (5-2 aggregate): Chelsea to face Spanish side in Women's Champions League semi-finals",
    description:
      "Barcelona beat Brann 2-1 in the first leg of their Women's Champions League quarter-final and followed that up with a 3-1 victory on Thursday night; European and Spanish champions will now face Emma Hayes' Chelsea in the semi-finals",
    img: "https://e0.365dm.com/24/03/1600x900/skysports-barcelona-champions-league_6503679.jpg?20240328194031",
  },
  {
    title:
      "Gary Neville says Arsenal must win at Man City, plus Premier League 'title deciders' that did prove crucial",
    description:
      "Man City host Arsenal at the Etihad on Sunday (kick-off 4.30pm); Mikel Arteta searching for his first win away to City since he returned to Arsenal as manager; ahead of another huge game in the title race, we look at five games billed as title deciders that did prove pivotal in the end",
    img: "https://e0.365dm.com/23/10/1600x900/skysports-football-premierleague_6314454.jpg?20231008194548",
  },
  {
    title:
      "Jurgen Klopp's edge: Liverpool manager's approach to marginal gains will help define his Anfield legacy",
    description:
      "From throw-in coaches to ophthalmologists, big-wave surfers to penalty psychologists, the legacy of Jurgen Klopp is in the learning culture he has created at Liverpool. Adam Bate reflects on why Klopp's openness to new ideas helps explain his success...",
    img: "https://e0.365dm.com/24/03/1600x900/skysports-premier-league-jurgen-klopp_6486922.jpg?20240311120452",
  },
  {
    title:
      "Man City vs Arsenal: John Stones, Kyle Walker, Bukayo Saka and Gabriel Martinelli in race to be fit for Super Sunday clash live on Sky Sports",
    description:
      "John Stones and Kyle Walker limped off during England duty; both missed Man City training on Thursday; Bukayo Saka and Gabriel Magalhaes withdrew from national team squads; watch Man City vs Arsenal live on Sky Sports Premier League on Sunday; kick-off 4.30pm",
    img: "https://e0.365dm.com/24/03/1600x900/skysports-john-stones-england_6501836.jpg?20240326200441",
  },
  {
    title:
      "Castleford Tigers 6-26 Leeds Rhinos: Paul Momirovski and Lachlan Miller power visitors to victory",
    description:
      "Off-season recruits Paul Momirovski and Lachlan Miller got their first tries for Leeds Rhinos in the Betfred Super League Rivals Round clash at Castleford Tigers; the match at the Mend-A-Hose Jungle was 0-0 at half-time",
    img: "https://e0.365dm.com/24/03/1600x900/skysports-lachlan-miller-rugby-league_6503804.jpg?20240328214140",
  },
  {
    title:
      "Man City vs Arsenal: Rodri faces Declan Rice in key midfield battle in the Premier League title race",
    description:
      "Rodri and Declan Rice have been standout, irreplaceable players for Man City and Arsenal in midfield this season; the two will meet in a huge game for the title race on Super Sunday",
    img: "https://e0.365dm.com/24/03/1600x900/skysports-rice-rodri_6494827.png?20240319105059",
  },
];

const getFakeData = (pageSize: number, categoryEnum: NewsCategoryEnum): NewsDataType[] =>
  Array.from({ length: pageSize }).map((_, index) => ({
    _id: index,
    category: categoryEnum,
    title: fakeDataNews[index].title,
    description: fakeDataNews[index].description,
    img: fakeDataNews[index].img,
    content: `<div class="w-full h-fit">
    <div class="font-bold text-4xl ">
     ${fakeDataNews[index].title}
    </div>
    <div class="w-full h-fit flex items-center py-6">
      <img src="${fakeDataNews[index].img}" alt="img" class="w-full h-96 object-cover object-center rounded-md" />
    </div>
    <div class="w-full h-fit">${fakeDataNews[index].description}</div>
  </div>`,
    created_at: new Date(),
  }));

const getBigNews = async () =>
  new Promise<ResponseDataType<NewsDataType[]>>((resolve) => {
    setTimeout(() => {
      resolve({
        data: getFakeData(8, NewsCategoryEnum.BIG),
        meta: {
          total: 8,
        },
      });
    }, 1000);
  });

const getLastestNews = async () =>
  new Promise<ResponseDataType<NewsDataType[]>>((resolve) => {
    setTimeout(() => {
      resolve({
        data: getFakeData(3, NewsCategoryEnum.LASTEST),
        meta: {
          total: 3,
        },
      });
    }, 1000);
  });

const getTransferNews = async () =>
  new Promise<ResponseDataType<NewsDataType[]>>((resolve) => {
    setTimeout(() => {
      resolve({
        data: getFakeData(8, NewsCategoryEnum.LASTEST),
        meta: {
          total: 8,
        },
      });
    }, 1000);
  });
const getHotNews = async () =>
  new Promise<ResponseDataType<NewsDataType[]>>((resolve) => {
    setTimeout(() => {
      resolve({
        data: getFakeData(4, NewsCategoryEnum.HOT),
        meta: {
          total: 4,
        },
      });
    }, 1000);
  });

const getRelatedNews = async () =>
  new Promise<ResponseDataType<NewsDataType[]>>((resolve) => {
    setTimeout(() => {
      resolve({
        data: getFakeData(3, NewsCategoryEnum.LASTEST),
        meta: {
          total: 3,
        },
      });
    }, 1000);
  });

const fakeDataWithId = getFakeData(8, NewsCategoryEnum.BIG);

const getNewsById = async (newsId: number) =>
  new Promise<NewsDataType>((resolve) => {
    setTimeout(() => {
      resolve(fakeDataWithId.find((item) => item._id === newsId) as NewsDataType);
    }, 1000);
  });

export { getRelatedNews, getBigNews, getLastestNews, getTransferNews, getHotNews, getNewsById };
