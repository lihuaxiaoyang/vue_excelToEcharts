import Department from './pages/page1/1department';
import Camp from './pages/page1/2camp';
import People from './pages/page1/3people';
import Zsstatus from './pages/page1/4house';
import Equipment from './pages/page1/5equipment';
import Zhuangbei from './pages/page1/6zhuangbei';
import Societyhelp from './pages/page1/7societyhelp';
// import Aroundhelp from './pages/page1/8aroundhelp.vue';
import Associatehelp from './pages/page1/9associatehelp';
import Backupdanyuan from './pages/page1/11baozhangdanyuan';
import Backupjigou from './pages/page1/10baozhangjigou';
// import Backupgroup from './pages/page1/12backupgroup';
// import Minibackupgroup from './pages/page1/13minibackupgroup';
import Guofanggongcheng from './pages/page1/14guofanggongcheng';
import Zhanbeiwuzi from './pages/page1/15zhanbeiwuzi';
import Guanjiansheshi from './pages/page1/16guanjiansheshi';
import Welcome from './pages/Welcome';
import CampVisual from './pages/visualpage/CampVisual';
import PeopleVisual from './pages/visualpage/PeopleVisual';
import WeaponVisual from './pages/visualpage/WeaponVisual';
//可视化主页面组件
import LoginPage from './pages/visualpage/LoginPage';
import LoginMap from './pages/visualpage/LoginMap';
import LoginPie from './pages/visualpage/LoginPie';
import LoginBar from './pages/visualpage/LoginBar';
import LoginDoubleBar from './pages/visualpage/LoginDoubleBar';
import LoginRing from './pages/visualpage/LoginRing'
//关系维护
// import linkManager from './renderer/components/linkManager'
import linkManager from './components/linkManager'
import ExportExcel from './pages/visualpage/ExportExcel'

//知识图谱关系组件

// 数据的导入导出
import Import from './pages/page5/import.vue';
// echart可视化效果
const menu = [
    { name: '欢迎页', path: '/welcome', component: Welcome },
    { name: '单位', path: '/1department', component: Department },
    { name: '营区/阵地', path: '/2camp', component: Camp },
    { name: '人员', path: '/3people', component: People },
    { name: '营房', path: '/4house', component: Zsstatus },
    { name: '设备器材', path: '/5equipment', component: Equipment },
    { name: '装备', path: '/6zhuangbei', component: Zhuangbei },
    { name: '社会化保障', path: '/7socityhelp', component: Societyhelp },
    { name: '国防工程', path: '/14guofanggongcheng', component: Guofanggongcheng },
    { name: '战备物资储备', path: '/15zhanbeiwuzi', component: Zhanbeiwuzi },
    { name: '关键保障设施', path: '/16guanjiansheshi', component: Guanjiansheshi },
    { name: '联勤保障力量', path: '/9associatehelp', component: Associatehelp },
    { name: '保障机构', path: '/10baozhangjigou', component: Backupjigou },
    { name: '保障单元', path: '/11baozhangdanyuan', component: Backupdanyuan },
    { name: '人员单位可视化', path: '/peopleVisual', component: PeopleVisual },
    { name: '单位营区可视化', path: '/campVisual', component: CampVisual },
    { name: '单位实力可视化', path: '/weaponVisual', component: WeaponVisual },
    { name: '可视化主页面', path: '/loginPageVisual', component: LoginPage },
    { name: '可视化主页面地图', path: '/loginMap', commponent: LoginMap },
    { name: '可视化主页面饼图', path: '/loginPie', component: LoginPie },
    { name: '可视化主页面单柱图', path: '/loginBar', component: LoginBar },
    { name: '可视化主页面双柱图', path: '/loginDoubleBar', component: LoginDoubleBar },
    { name: '可视化主页面环状图', path: '/loginRing', component: LoginRing },
    { name: '关系维护', path: '/relationManager', component: linkManager },
    { name: '定制化表格导出', path: '/exportexcel', component: ExportExcel }

];
export default menu;