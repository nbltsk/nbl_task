# nbl_task

This project was generated with Vue CLI

Run `npm install` to install all needed packages.
Run `npm start` for a dev server. Navigate to `http://localhost:8080/`.
Run `npm test` to execute the exemplary unit test.

The task contains 2 layouts:

1) Main layout with paginated all NBA players - the user can go to any page (including first & last one - counting based on total records number). Waiting for fresh data is signaling to the user by the loader. Below the marked current position on pagination, the user can see how many of potencial records are available and where the active page is placed within all of them. Clicking active button with player is redirecting him to dedicated player's dashboard.

2) Additional layout - is generating for every player that can be chosen on main page. The user see here basic informations about the player: bio & team. As a additional feature, the user can choose position from dropdown list to see the dynamic bar chart with given type of statistics gathered based on season range (2015-2020). Anytime the user can directly go back to mainpage and chosen another player to display.

The layout is responsive, mechanism of pagination is implemented using Vue Pagination 2 (https://www.npmjs.com/package/vue-pagination-2), bar chart is rendered using Vue-ECharts (https://github.com/ecomfe/vue-echarts), API requests are implemented with Axios library (https://www.npmjs.com/package/vue-axios)

The task includes exemplary component's test, typescript's types. The data are displayed as they are, without replacing any missing (null) data -> to consider by product team.

The task took approximately 12 hours, most on the following steps:

- setup & configuration project - 2h
- adding components & styling - 5h
- adding tests, clean up - 3h

Things to do, that should be developed subsequently:

- extracting duplicated piece of components + creating individual for select
- extracting API requests to separate service (using repository pattern - introduce additional abstract layer to manage domain grouped api's calls)
- moving reusing parts into mixins
- moving part of components' data into modularized vuex store
- replacing typescript's 'any' types
- adding more tests (including unit ones), more precised error handling
- fixing loader for player page (currently it only works for main page)