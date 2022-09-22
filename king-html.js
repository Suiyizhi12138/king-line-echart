
  //定义Profile类
  var Profile = function(){
    var self = this
    //包含的页面
    this.pages = ['mainProfile','editProfile','lineProfile']
    //信息主页
    this.mainProfile = document.querySelector('.main-profile')
    //编辑主页
    this.editProfile = document.querySelectorAll('.edit-profile')[0]
    //图表主页
    this.lineProfile = document.querySelectorAll('.line-profile')[0]
    //创建子类 将自身传入以调用
    this.mainProfileObj = new MainProfile(self)
    this.editProfileObj = new EditProfile(self)
    this.lineProfileObj = new LineProfile(self)
    


    //页尾按钮
    this.btnFooter1 = document.querySelector('[data-action="f-btn1"]')
    this.btnFooter2 = document.querySelector('[data-action="f-btn2"]')
    this.btnFooter3 = document.querySelector('[data-action="f-btn3"]')
    
  }
  
  //Profile 初始化
  Profile.prototype.init = function(){
    //console.log(this.mainProfile)
    this.mainProfileObj.init()
    this.editProfileObj.init()
    this.lineProfileObj.init()
    this.bindEvent()
  }
  
  //Profile绑定事件
  Profile.prototype.bindEvent = function(){
    var self = this
    this.btnFooter1.onclick = function(){
      self.changeBtnState('profile')
      self.changeMain('mainProfile')
    }
    this.btnFooter2.onclick = function(){
      self.changeBtnState('line')
      self.changeMain('lineProfile')
      
    }
    this.btnFooter3.onclick = function(){
       self.changeBtnState('level')
    }
  }
  //切换主页
  Profile.prototype.changeMain = function(pageStr){
    var self = this
    this.pages.forEach(function(page){
      if(page === pageStr){
         console.log(pageStr)
        self[page].style.display = 'block'
      }else{
        self[page].style.display = 'none'
      }
    })
  }
  //切换按钮状态
  Profile.prototype.changeBtnState = function(state){
    switch(state){
      case 'profile':
        this.btnFooter1.classList.add('footer-btn-active')
        this.btnFooter2.classList.remove('footer-btn-active')
        this.btnFooter3.classList.remove('footer-btn-active')
        //this.changeMain('mainProfile')
        break;
      case 'line':
        this.btnFooter1.classList.remove('footer-btn-active')
        this.btnFooter2.classList.add('footer-btn-active')
        this.btnFooter3.classList.remove('footer-btn-active')
        //this.changeMain('lineProfile')
        break;
      case 'level':
        this.btnFooter1.classList.remove('footer-btn-active')
        this.btnFooter2.classList.remove('footer-btn-active')
        this.btnFooter3.classList.add('footer-btn-active')
        break;

    }
  }
  
  
  //定义 MainProfile 个人信息页
  var MainProfile = function(supObj){
    this.sup = supObj
    this.btnAvatar = document.querySelector('[data-action="btn-avatar"]')
    this.btnEdit = document.querySelector(['[data-action="btn-edit"]'])
  }

  MainProfile.prototype.init = function(){
    this.bindEvent()
  }
  MainProfile.prototype.bindEvent = function(){
    //保存this
    var that = this
    this.btnEdit.onclick = function(){
      //这里的this 指向的是btn
      that.sup.changeMain('editProfile')
    } 
  }

  //定义编辑信息页 EditProfile
  var EditProfile = function(supObj){
    this.sup = supObj

    this.btnSaveInfo = document.querySelectorAll('.btn-save-info')[0]
    this.btnEditBack = document.querySelectorAll('.btn-edit-back')[0]
  }
  //EidtProfile 初始化方法
  EditProfile.prototype.init = function(){
    this.bindEvent()
  }
  //EditProfile 绑定事件
  EditProfile.prototype.bindEvent = function(){
    var self = this
    this.btnSaveInfo.onclick = function(){
      //这里不做实现 直接返回
      self.sup.changeMain('mainProfile')
    }
    this.btnEditBack.onclick = function(){
      self.sup.changeMain('mainProfile')
    }
  }

  //定义 LineProfile 对象
  var LineProfile = function(supObj){
    this.sup = supObj //父类
    //表格容器
    this.chartDom = document.querySelector('#line-detail')
    //表格
    this.lineChart = echarts.init(this.chartDom)
    //表格配置
    this.chartOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'cross' }
      },
      legend: {
        top: 'bottom'
      },
      grid: {
        show: false
      },
      xAxis: [
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true,
            
          },
          axisLabel: {
            formatter: '{value}'
          },
          data: [
            '2022-02-27','2022-02-28','2022-08-18','2022-08-19',
            '2022-08-20','2022-02-21','2022-08-22','2022-08-23',
            '2022-08-24','2022-08-25','2022-08-25','2022-08-26',
            
          ]
        }
      ],
      yAxis: [
        {
          type: 'value',
          //name: '正确率',
          min: 0,
          max: 100,
          position: 'right',
          axisLabel: {
            formatter: '{value} %'
          },
          //背景线
          splitLine:{
            lineStyle: 'none'
          }
        },
        {
          type: 'value',
          //name: '速度',
          min: 0,
          max: 52,
          position: 'left',
          axisLabel: {
            formatter: '{value} 字/分'
          }
        }
      ],
      series: [
        {
          name: '速度',
          type: 'line',
          yAxisIndex: 1,
          data: [37, 52, 40, 5, 22, 29, 25, 4, 22, 37, 39, 42, 37]
        },
        {
          name: '正确率',
          type: 'line',
          smooth: true,
          yAxisIndex: 0,
          data: [
            99, 99, 98, 97, 99, 100, 99, 100, 99, 99, 99, 99, 99
          ],
          itemStyle: {
            color: 'red'
          }
        }
      ]
    }
    
    //日历 起始位置
    this.dateStart = document.querySelector('[data-action="date-start"]')
    this.dateEnd = document.querySelector('[data-action="date-end"]')
    //查找按钮
    this.btnSearch = document.querySelector('[data-action="search-data"]') 
  }
  LineProfile.prototype.init = function(){
    //初始化表格
    this.lineChart.setOption(this.chartOption)
    this.bindEvent()
    
  }
  LineProfile.prototype.bindEvent = function(){
    var self = this
    this.btnSearch.onclick = function(){
      let dateStart = self.dateStart.value
      let dateEnd = self.dateEnd.value
      let dates = self.chartOption.xAxis[0].data
      let newStartIndex = 0;//筛选的新的下标
      let newEndIndex = 0;//新的结束index
      //遍历 当前时间数组查找时间大于起点的
      for(let i=0; i < dates.length; i++){
        if(new Date(dates[i]) >= new Date(dateStart)){
          newStartIndex = i;
          break;
        }
      }

      for(let i = dates.length; i>0; i--){
        if(new Date(dates[i]) <= new Date(dateEnd)){
          newEndIndex = i;
          break;
        }
      }

      // console.log(newStartIndex)
      // console.log(newEndIndex)

      self.chartOption.xAxis[0].data = self.chartOption.xAxis[0].data.slice(newStartIndex,newEndIndex);//截取新的x轴数据
      self.chartOption.series[0].data = self.chartOption.series[0].data.slice(newStartIndex,newEndIndex);//截取新的速度数据
      self.chartOption.series[1].data = self.chartOption.series[1].data.slice(newStartIndex,newEndIndex);//截取新的正确率数据

      //重新绘制表格
      if(self.lineChart){
        self.lineChart.dispose()

        self.lineChart = echarts.init(self.chartDom);

        self.lineChart.setOption(self.chartOption)
      }
     
     

    }
    
  }

  //修改图表
  LineProfile.prototype.changeChart = function(chart){
    //根据传入的字符串修改表格对应的数据
    //模拟表格数据
    var data = {
      words: {
        //日期
        dates:[  
                  '2022-02-27','2022-02-28','2022-08-18','2022-08-19',
                  '2022-08-20','2022-08-21','2022-08-22','2022-08-23',
                  '2022-08-24','2022-08-25','2022-08-25','2022-08-26',
              ],
        //速度 
        speeds: [ 53, 100, 89, 107, 108, 95, 115, 34, 74, 36, 90, 83, 80],
        //正确率
        correctRates: [ 99, 99, 98, 97, 99, 100, 99, 100, 99, 99, 99, 99, 99 ]

      }
    }
    //数据集格式

    switch(chart){
      case 'words': //英文语句
      this.lineChart.dispose() //销毁原实例
      this.lineChart  = echarts.init(this.chartDom) //重新绘制图表
      this.chartOption.yAxis[1].max = Math.max.apply(this,data.words.speeds) //修改y轴
      this.chartOption.series[0].data = data.words.speeds;
      this.chartOption.series[1].data = data.words.correctRates
      //alert(this.chartOption.xAxis.max)
      this.lineChart.setOption(this.chartOption)
      break;
    }
  }
  //点击查找 修改日期
  LineProfile.prototype.selectData = function(){
    //根据选择的日期 筛选数据
    if(this.lineChart){
      console.log('select data')
    }
  }

 


  //初始化myChart 
  // var myChart = echarts.init(document.querySelector('#line-detail'))

  // var option = {
  //   tooltip: {
  //     trigger: 'axis',
  //     axisPointer: { type: 'cross' }
  //   },
  //   legend: {},
  //   grid: {
  //     show: false
  //   },
  //   xAxis: [
  //     {
  //       type: 'category',
  //       axisTick: {
  //         alignWithLabel: true,
          
  //       },
  //       axisLabel: {
  //         formatter: '{value}'
  //       },
  //       data: [
  //         '2022-02-27','2022-02-27','2022-08-18','2022-08-19',
  //         '2022-02-27','2022-02-27','2022-08-18','2022-08-19',
  //         '2022-02-27','2022-02-27','2022-08-18','2022-08-19',
          
  //       ]
  //     }
  //   ],
  //   yAxis: [
  //     {
  //       type: 'value',
  //       //name: '正确率',
  //       min: 0,
  //       max: 100,
  //       position: 'right',
  //       axisLabel: {
  //         formatter: '{value} %'
  //       },
  //       //背景线
  //       splitLine:{
  //         lineStyle: 'none'
  //       }
  //     },
  //     {
  //       type: 'value',
  //       //name: '速度',
  //       min: 0,
  //       max: 115,
  //       position: 'left',
  //       axisLabel: {
  //         formatter: '{value} 字/分'
  //       }
  //     }
  //   ],
  //   series: [
  //     {
  //       name: '速度',
  //       type: 'line',
  //       yAxisIndex: 0,
  //       data: [37,52,40,5,22,29,25,4,22,37,39,42,37]
  //     },
  //     {
  //       name: '正确率',
  //       type: 'line',
  //       smooth: true,
  //       yAxisIndex: 1,
  //       data: [
  //         99,
  //         98,
  //         99,
  //         99,
  //         99,
  //         99,
  //         98
  //       ],
  //       itemStyle: {
  //         color: 'red'
  //       }
  //     }
  //   ]
  // };
  
  var Robo = new Profile()
  Robo.init()
