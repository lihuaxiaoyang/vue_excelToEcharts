<template>
    <el-card>
        <el-input
        placeholder="输入单位-营区关键字进行过滤"
        prefix-icon="el-icon-search"
        v-model="filterText">
        </el-input>
        <el-tree
        :data="departmentTreeData"
        node-key="id"
        render-after-expand
        :default-expanded-keys="['00']"
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
        :props="defaultProps"
        ref="tree"
        @node-click="getCurrentNodeclick">
        <span class="custom-tree-node" slot-scope="{ node }">
          <span>{{ node.label }}</span>
        </span>
      </el-tree>
    </el-card>
</template>

<script>
export default {
  data() {
    return {
      departmentTreeData:null,
      filterText: "",
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  created() {
    this.initDepartmentTree();
  },
  watch: {
    // 过滤单位树文本
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  methods: {
    //获取当前选中node节点数据
    getCurrentNodeclick(data) {
        this.$emit("listenTree", data);
      // if (data.class === "5") {
      //   this.campcode = data.id;
      //   this.$emit("listenvalue", [data.id, data.label, data.class]);
      // }
    },
    // 过滤节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
   initDepartmentTree(){
      this.departmentTreeData = [
        {
          id:"00",
          class:1,
          label:"部队",
          depid:"",
          children:[],
        }
      ];
      const depSQL = `SELECT * FROM department where isdel = 0`;
      this.$db.all(depSQL, (err, res) => {
        if (err) {
          this.$logger(err);
          this.$Notice.error({
            title: "营区树加载失败",
            desc: err,
          });
        } else {
          for(let p = 0;p<res.length;p++){
            if(res[p].bianma.split('-').length == 2){
              const firstChild = {
                id:res[p].bianma,
                class:res[p].class,
                label:res[p].name,
                depid:res[p].id,
                children:[],
              }
              for(let z = 0;z<res.length;z++){
                if(res[z].bianma.split('-').length == 3 && res[z].bianma.search(res[p].bianma) != -1){
                  const secondChild = {
                  id:res[z].bianma,
                  class:res[z].class,
                  label:res[z].name,
                  depid:res[z].id,
                  children:[],
                  }
                  for(let j = 0;j<res.length;j++){
                    if(res[j].bianma.split('-').length == 4 && res[j].bianma.search(res[z].bianma) != -1){
                      const thirdChild = {
                        id:res[j].bianma,
                        class:res[j].class,
                        label:res[j].name,
                        depid:res[j].id,
                      };
                    secondChild.children.push(thirdChild);
                    }
                  }
                  firstChild.children.push(secondChild)
                }
              }
              this.departmentTreeData[0].children.push(firstChild);
            }
          }
        }
      });
   },
  },
};
</script>