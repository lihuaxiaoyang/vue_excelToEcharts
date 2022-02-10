<template>
        <div class="container_box">
            <el-button @click="exportExcel" type="primary">导出数据</el-button>
            <!-- <el-select v-model="value" placeholder="" clearable filterable>
              <el-option
                v-for="item in exportOption"
               :label="item.value" :value="item.value"
               :key="item.value"
               >
               </el-option>
            </el-select> -->

    <div class="table_4_signle">
        <p class="tbale_data_title" style="font-size: 25px;font-weight: 600;">三局八处枪会山营区后勤保障明细表
            </p>
            <table id="table4_signle" class="datalist" border=1>
                
            </table>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import '../../utils/jquery.table2excel';
export default {
    data(){
        return {
            exportOption:this.$val.exportOption,
            value:null,
        }
    },
    methods: {
        exportExcel(){
            $("#table4_signle").table2excel({
                exclude: ".noExl",
                name: "Excel Document Name",
                filename: "三局八处枪会山营区后勤保障明细表",
                exclude_img: true,
                exclude_links: true,
                exclude_inputs: true
            });
        }
    },
    mounted() {
      const WhereSQL1 = `SELECT * from zhuangbei where type = '汽车'`;
      this.$db.all(WhereSQL1, (err, restemp) => {
        if (err) {
          this.$logger(err);
          this.$Notice.error({
            desc: err,
          });
        } else {
            var str=`
            <thead id="thead1">
                    <tr>
                        <th colspan="24">后勤人员情况</th>
                    </tr>
                    <tr>
                        <th colspan="2">专业区分</th>
                        <th>合计</th>
                        <th>战勤专业</th>
                        <th colspan="2">财务专业</th>
                        <th colspan="3">军需专业</th>
                        <th colspan="3">能源专业</th>
                        <th>采购专业</th>
                        <th>卫生专业</th>
                        <th colspan="2">军交专业</th>
                        <th colspan="3">营房专业</th>
                        <th>仓储专业</th>
                        <th colspan="3">其他</th>
                        <th>补充说明</th>
                    </tr>
                    <tr>
                        <th colspan="2">军官</th>
                        <th></th>
                        <th></th>
                        <th colspan="2"></th>
                        <th colspan="3"></th>
                        <th colspan="3"></th>
                        <th></th>
                        <th></th>
                        <th colspan="2"></th>
                        <th colspan="3"></th>
                        <th></th>
                        <th colspan="3"></th>
                        <th></th>
                    </tr>
                    <tr>
                        <th colspan="2">文职人员</th>
                        <th></th>
                        <th></th>
                        <th colspan="2"></th>
                        <th colspan="3"></th>
                        <th colspan="3"></th>
                        <th></th>
                        <th></th>
                        <th colspan="2"></th>
                        <th colspan="3"></th>
                        <th></th>
                        <th colspan="3"></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="tbody1">
                    <tr>
                        <td rowspan="2">士兵</td>
                        <td rowspan="1">岗位</td>
                        <td></td>
                        <td>保障卡管理员</td>
                        <td>出纳</td>
                        <td>司务长</td>
                        <td>炊事员</td>
                        <td>给养员</td>
                        <td>食堂管理员</td>
                        <td>油料员</td>
                        <td>油料化验员</td>
                        <td>油料保管员</td>
                        <td>采购员</td>
                        <td>卫生员</td>
                        <td>驾驶员</td>
                        <td>汽车修理工</td>
                        <td>动力电源维修</td>
                        <td>营房修理工</td>
                        <td>电工</td>
                        <td>各类保管员</td>
                        <td>养殖员</td>
                        <td>种植员</td>
                        <td>其他岗位</td>
                        <td rowspan="2"></td>
                    </tr>
                    <tr>
                        <td>人数</td>
                        <td></td>
                        <td>0</td>
                        <td>0</td>
                        <td>1</td>
                        <td>2</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>2</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <th colspan="24">装备器材情况</th>
                    </tr>
                    <tr>
                        <th colspan="1">类型</th>
                        <th colspan="8">名称</th>
                        <th colspan="8">型号</th>
                        <th colspan="3">数量</th>
                        <th colspan="3">状态</th>
                        <th colspan="1" >补充说明</th>
                    </tr>
            `
            var str1="";
            var str2=`
                    <tr>
                        <td rowspan="1">后勤装备</td>
                        <td colspan="8"></td>
                        <td colspan="8"></td>
                        <td colspan="3"></td>
                        <td colspan="3"></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td rowspan="1">后勤器材</td>
                        <td colspan="8"></td>
                        <td colspan="8"></td>
                        <td colspan="3"></td>
                        <td colspan="3"></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th colspan="24">后勤专业机构及设施设备情况</th>
                    </tr>
                    <tr>
                        <th colspan="1">类型</th>
                        <th colspan="8">项目</th>
                        <th colspan="15">简述</th>
                    </tr>
                    <tr>
                        <th colspan="1" rowspan="2">饮食</th>
                        <th colspan="8">食堂</th>
                        <th colspan="15">食堂位于枪会山营区9栋一层，用于保障枪会山营区军官、士官、义务兵及家属就餐，现有xxx等</th>
                    </tr>
                    <tr>
                        <th colspan="8">本级饮食保障能力</th>
                        <th colspan="15">可满足枪会山营区20人左右同时用餐</th>
                    </tr>
                    <tr>
                        <th colspan="1" rowspan="2">医疗</th>
                        <th colspan="8">卫生机构</th>
                        <th colspan="15">xxxx</th>
                    </tr>
                    <tr>
                        <th colspan="8">本级医疗保障能力</th>
                        <th colspan="15">xxxx</th>
                    </tr>
                    <tr>
                        <th colspan="1" rowspan="2">油料</th>
                        <th colspan="8">储油设施设备</th>
                        <th colspan="15">xxxx</th>
                    </tr>
                    <tr>
                        <th colspan="8">本级油料储供能力</th>
                        <th colspan="15">xxxx</th>
                    </tr>
                    <tr>
                        <th colspan="1">填写说明</th>
                        <th colspan="23">士兵岗位可增加......</th>
                    </tr>
                </tbody>
            `
            str1= `<tr>
                        <td rowspan=${restemp.length}}>通用车辆</td>
                        <td colspan="8">${restemp[0].name}</td>
                        <td colspan="8">${restemp[0].zhuangbeiID}</td>
                        <td colspan="3">${restemp[0].shilishuliang}</td>
                        <td colspan="3">${restemp[0].shiyongzhuangtai}</td>
                        <td rowspan=${restemp.length+2}></td>
                        <td></td>
                    </tr>`
            for(let i = 1;i<restemp.length;i++){
                str1+= `<tr>
                        <td colspan="8">${restemp[i].name}</td>
                        <td colspan="8">${restemp[i].zhuangbeiID}</td>
                        <td colspan="3">${restemp[i].shilishuliang}</td>
                        <td colspan="3">${restemp[i].shiyongzhuangtai}</td>
                        <td></td>
                    </tr>`
            }
            var str3=str+str1+str2;
            // console.log(str3)
            const dom2 = document.querySelector('#table4_signle');
            dom2.innerHTML = str3;
        }
      });
      const WhereSQL = `SELECT * from department where name = '部队本级'`;
        this.$db.all(WhereSQL, (err, restemp) => {
        if (err) {
          this.$logger(err);
          this.$Notice.error({
            desc: err,
          });
        } else {
            const dom = document.querySelector('#table4_signle #thead1 tr:nth-child(3) th:nth-child(5)');
            dom.innerHTML = restemp[0].bianzhi;
            const dom1 = document.querySelector('#table4_signle #thead1 tr:nth-child(3) th:nth-child(6)');
            dom1.innerHTML = restemp[0].jgshiyou;
        }
      });

                      // var str ='';
                // var data = [];
                // for(let i = 0;i<data.length;i++){
                //   str+= `<tr>
                //         <td colspan="8">${data[0].name}</td>
                //         <td colspan="8">CDA397716</td>
                //         <td colspan="3">1</td>
                //         <td colspan="3">在用</td>
                //         <td></td>
                //     </tr>`
                // }
    },
}
</script>

<style scoped>
    .table_4_signle{
        width:100%;
        height:600px;
        /* background-color: red; */
    }
    .datalist{
        width:100%;
        height:100%;
        
    }
    .container_box{
        width: 100%;
        height: 43.75rem;
    }
    td {
        text-align: center !important;
    }
    
    .tbale_data_title {
        border: 0;
        margin: 0;
        text-align: center;
        font-size: 20px;
    }
    
    .table_button_class {
        /* display: inline-block; */
        width: 100%;
        height: 25px;
    }

    table{
        border-collapse: collapse;
    }

    table td{
        empty-cells: show;
    }
    tr {
        text-align: center;
    }
</style>

<style>
    th{
        text-align: center;
    }
    tr{
        text-align: center;
    }
        table{
                text-align: center;

    }
</style>