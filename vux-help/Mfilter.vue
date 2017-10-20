<template>
  <div>
    <transition name="anifilter">
      <div class="m-filter" v-show="show">
        <div class="m-filter-header vux-1px-b">

          <span style="font-size: 12px;padding-left: 10px;" v-show="getSelectData.length == 0">筛选</span>

          <span class="m-filter-header-span" v-for="target in getSelectData" @click="removeTag(target)">
            {{target.select}}
            <span class="close">
              <Micon icon="icon-guanbi"></Micon>
            </span>
          </span>

          <div class="clear-filter" v-show="getSelectData.length > 0" @click="clearAll">
            <Micon icon="icon-guanbi"></Micon>
          </div>
        </div>

        <div class="m-filter-scroll">
          <div class="scroll-children apple-scroll m-left-scroll">
            <ul>
              <li class="item text-wrap" :class="{ 'active': index == nowTargetData.index }" v-for="(target,index) in data" @click="changeParentList(index)">{{target.name}}</li>
            </ul>
          </div>
          <div class=" scroll-children apple-scroll m-right-scroll" ref="rscroll">
            <ul>
              <li class="item text-wrap" :class="{ 'active': target.active }" v-for="target in getChildren" @click="changeChildrenList(target)">
                {{target.name}}
                <Micon icon="icon-xuanzhong"></Micon>
              </li>
            </ul>
          </div>
        </div>

        <div class="filter-form" v-show="nowTargetData.type == 0">
          <input type="text" v-model="inputValue" maxlength="30">
          <a href="javascript:;" class="chouse-btn tip" @click="appendNewData">添加</a>
        </div>

        <div class="filter-form" v-show="nowTargetData.type == 1">
          <datetime v-model="timeValue" @on-change="timechange" format="YYYY-MM-DD HH:mm" class="filter-time"></datetime>
        </div>


        <div class="sure-form">
          <a href="javascript:;" class="chouse-btn tip pull-right" @click="submit">确定</a>
          <a href="javascript:;" class="chouse-btn tip pull-left" @click="close">取消</a>
        </div>
      </div>
    </transition>

    <Mcover @close="coverCloseEvent" ref="mcover"></Mcover>
  </div>
</template>

<script type="text/ecmascript-6">
  import Micon from './Micon'
  import Mcover from './Mcover'
  var _ = require('lodash');
  import { Datetime,dateFormat } from 'vux'

  export default{
    name: 'm-filter',
    components: {
      Micon,
      Datetime,
      Mcover
    },
    props: {
      data: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        // 已选择地结果的对象
        chousedGroup: {},

        // 目前选中的数据
        nowTargetData: {
          index: 0,
          length: 0,

          inputType: 0 // 输入方式 0 = text; 1 = time; 2 = ajax(待定);
        },

        // 来自用户输入的字节
        inputValue: '',

        // 时间value
        timeValue: '',

        // 显示和隐藏
        show: false
      }
    },
    methods: {
      changeParentList (index) {
        this.timeValue = ''
        this.nowTargetData.index = index;
        this.nowTargetData.type = this.data[index].type;
      },
      changeChildrenList (target) {

        _.forEach(target.parent.children,function (value) {
          value.active = false;
        })

        target.active = true;

        var gName = this.data[this.nowTargetData.index].name

      },
      appendNewData () {

        if(this.nowTargetData.type == 1 && _.isEmpty(this.inputValue)){
          this.inputValue = this.timeValue
        }

        //为空阻止填充
        if(_.isEmpty(this.inputValue)){

//          this.$vux.toast.text('所填数据不能为空','middle')
          return;
        }



        //新填写的数据默认选中
        _.forEach(this.data[this.nowTargetData.index].children,function (value) {
          value.active= false;
        })
        this.data[this.nowTargetData.index].children.push({
          name: this.inputValue,
          active: true,
          parent: this.data[this.nowTargetData.index]
        })

        // 填完数据后回顶部
        setTimeout(()=>{
          this.$refs.rscroll.scrollTop = 9999;
        },100)

        //填完后清楚数据
        this.inputValue = '';
      },

      // 删除添加的数据
      removeTag (target){

        // 清除现在选中的
        target.position.target.active = false;

        // 重置成全部
        console.log(target.position.target.parent.children[0].active = true)
      },

      //清除全部

      clearAll () {
        _.forEach(this.data, (value, key)=> {
          _.forEach(value.children, (valueer,keyer)=> {
            valueer.active = false

          })
          value.children[0].active= true;
        })
      },

      //时间改变
      timechange: function (time) {
        this.inputValue = time;
        this.appendNewData();
      },

      // 关闭筛选框
      close () {
        this.show = false;
        this.$refs.mcover.close();
      },

      open () {
        this.show = true;
        this.$refs.mcover.open();
      },

      submit () {
        this.close()
        this.$emit('submit',this.chousedGroup);
      },

      coverCloseEvent () {
        this.close()
      }

    },
    mounted () {

      // 遍历数组，给子元素加 active
      var self = this;

      _.forEach(this.data, (value, key)=> {

        _.forEach(value.children, (valueer,keyer)=> {
          self.$set(self.data[key].children[keyer],'active',false)
          valueer.parent = value;
        })

        value.children[0].active = true;
      })

      this.nowTargetData.type = this.data[0].type
    },
    computed: {
      getChildren () {
          return this.data[this.nowTargetData.index].children || [];
      },
      getSelectData () {
        let chouseAyyay = [];

        _.forEach(this.data,function (value, index) {
          _.forEach(value.children,function (eValue, eIndex) {
            if(eValue.active){
              if(eValue.name == "全部")
                  return

              chouseAyyay.push({
                name: value.name,
                select: eValue.name,
                parent: value,
                position: {
                  x: index,
                  y: eIndex,
                  target: eValue
                }
              })
            }
          })
        })

        return chouseAyyay;
      }
    }
  }
</script>

<style type="text/sass" lang="sass">
@import '../assets/sass/util'
.anifilter-enter-active, .anifilter-leave-active
  -webkit-transition: all 0.5s ease
  transition: all 0.5s ease

.anifilter-enter, .anifilter-leave-active
  -webkit-transform: translateY(-100%)
  transform: translateY(-100%)
  opacity: 1


.m-filter
  position: fixed
  top: 0px
  height: auto
  left: 0px
  background-color: #fff
  z-index: 600
  width: 100%
  display: block

  .m-filter-header
    padding: 10px 40px 18px 10px
    position: relative
    border-bottom: 1px solid #fbf9fe

    .m-filter-header-span
      display: inline-block
      padding: 2px 10px
      font-size: 12px
      background-color: #62affc
      color: #fff
      border-radius: 6px
      margin-right: 4px
      margin-top: 6px
      position: relative

      .close
        display: inline-block
        width: 14px
        height: 14px
        background-color: #D9534F
        border-radius: 50%
        color: #fff
        position: absolute
        right: -3px
        top: -3px
        text-align: center
        line-height: 12px
      .close .m-icon
        font-size: 10px

    .clear-filter
      position: absolute
      width: 14px
      height: 14px
      text-align: center
      line-height: 11px
      border-radius: 50%
      border: 1px solid #717171
      color: #717171
      right: 15px
      top: 50%
      margin-top: -7px

    .clear-filter .m-icon
      font-size: 12px

  .m-filter-scroll
    height: 200px
    background-color: #eee

    .scroll-children
      overflow-y: scroll
      height: 100%
      float: left
      @include box-sizing

    .m-left-scroll
      width: 40%
      background-color: #fff

    .m-right-scroll
      width: 60%
      background-color: #F2F6F9

    li.item
      height: 40px
      line-height: 40px
      padding-left: 20px
      font-size: 13px

    li.item.active
      background-color: #f2f6f9

    .m-right-scroll
      li
        position: relative
        border-bottom: 1px solid #ECECEC
        padding-right: 28px
        .m-icon
          color: #2AA846
          position: absolute
          height: 10px
          line-height: 10px
          right: 10px
          top: 50%
          margin-top: -5px
          display: none
      li.active
        .m-icon
          display: block

  .filter-form
    height: 42px
    background-color: #fff
    border-top: 1px solid #F0F0F0
    border-bottom: 1px solid #F0F0F0

    @include box-sizing
    padding: 5px 20px

    .filter-time
      padding: 0
      margin: 0
      border: 1px solid #efefef
      border-radius: 4px
      height: 28px
      width: 100%
      float: left
      @include box-sizing
      padding-right: 10px

      .weui-cell__ft
        text-align: left
        padding-left: 10px

    input
      border: 1px solid #efefef
      border-radius: 4px
      height: 28px
      text-indent: 6px
      width: 80%
      outline: none
      float: left

    a.chouse-btn
      display: inline-block
      width: 18%
      text-align: center
      color: #4183c4
      float: right
      font-size: 13px
      line-height: 30px

  .sure-form
    height: 40px
    line-height: 40px
    background-color: #fff
    padding: 0 20px
    border-bottom: 1px solid #fbf9fe

    a.chouse-btn
      color: #4183c4
      font-size: 13px




</style>
