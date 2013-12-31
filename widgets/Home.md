<b>{{~ it:v}}</b><br>

<h1> {{=v.name}}</h1>
<h2>1. 控件说明</h2>
<b>{{=v.package.description}}</b>

<h2>2. 控件接口 </h2>
<h3>2.1 控件基本信息(package.json)</h3>
此文件用于描述控件的基本信息：  
<ul>
   <li>控件版本号：<b>{{=v.package.version}}</b></li>
   <li>控件开发人员：<b>{{=v.package.author}}</b></li>
</ul>

<h3>2.2 控件配置参数(options.json)</h3>
此文件用于描述控件可配置的参数信息： 
  <table>
  <tr style="background-color:rgb(200,200,200)">
    <th>接口名称</th>
    <th>接口值类型</th>
    <th>接口描述</th>
    <th>接口值选填</th>
    <th>默认值</th>
    <th>图示</th>
  </tr>
  <b>{{~ v.options:t}}</b>
  <tr>
    <td><b>{{=t.name}}</b></td>
    <td><b>{{=t.type}}</b></td>
    <td><b>{{=t.description}}</b><br><b>{{? t.options}}</b><br><b>{{~ t.options:h}}</b><ul>
   <li><b>{{=h.value}}</b>：<b>{{=h.text}}</b></li></ul><b>{{~}}</b><br><b>{{?? t.item}}</b><br><b>{{~ t.item:i}}</b><br><b>{{? i.options}}</b>
    <ul><li><b>{{=i.name}}</b>：<b>{{=i.type}}</b>，<b>{{=i.description}}</b><br><b>{{~ i.options:o}}</b><ul><li><b>{{=o.value}}</b>：<b>{{=o.text}}</b></li></ul><b>{{~}}</b><br></li></ul><b>{{??}}</b><ul><li><b>{{=i.name}}</b>：<b>{{=i.type}}</b>，<b>{{=i.description}}</b></li></ul><b>{{?}}</b><br><b>{{~}}</b><br><b>{{?}}</b></td>
    <td><b>{{? t.required}}</b><br><b>{{=t.required}}</b><br><b>{{?}}</b></td>
    <td><b>{{? t.default}}</b><br><b>{{=t.default}}</b><br><b>{{?}}</b></td>
    <td>待定</td>
  </tr>
  <b>{{~}}</b>
</table>

<h3>2.3 发送信号参数(signals.json)</h3>
此文件用于描述控件发出的signal事件及参数信息：
  <table>
  <tr style="background-color:rgb(200,200,200)">
    <th>接口名称</th>
    <th>接口值类型</th>
    <th>接口描述</th>
  </tr>
  <b>{{? v.signals}}</b><br><b>{{~ v.signals:s}}</b>
    <tr>
    <td><b>{{=s.name}}</b></td>
    <td><b>{{? s.params!==[]}}</b><br><b>{{~ s.params:p}}</b><br><b>{{=p.type}}</b><br><b>{{~}}</b><br><b>{{??}}</b><br>无需绑定参数<br><b>{{?}}</b></td>
    <td><b>{{? s.params!==[]}}</b><br><b>{{~ s.params:p}}</b><br><b>{{=s.description}}时发出的事件，</b>参数：<b>{{=p.description}}</b><br><b>{{~}}</b><br><b>{{??}}</b><br><b>{{=s.description}}</b><br><b>{{?}}</b></td>
  </tr>
  <b>{{~}}</b><br><b>{{?}}</b>
  </table>

<h3>2.4 信号处理参数(slots.json)</h3>
此文件用于描述控件接收到signal事件以后的处理方法及参数信息：
 <table>
  <tr style="background-color:rgb(200,200,200)">
    <th>接口名称</th>
    <th>接口值类型</th>
    <th>接口描述</th>
  </tr>
  <b>{{? v.slots}}</b><br><b>{{~ v.slots:s}}</b>
    <tr>
    <td><b>{{=s.name}}</b></td>
    <td><b>{{? s.params!==[]}}</b><br><b>{{~ s.params:p}}</b><br><b>{{=p.type}}</b><br><b>{{~}}</b><br><b>{{??}}</b><br>无需绑定参数<br><b>{{?}}</b></td>
    <td><b>{{? s.params!==[]}}</b><br><b>{{~ s.params:p}}</b><br><b>{{=s.description}}</b>参数：<b>{{=p.description}}</b><br><b>{{~}}</b><br><b>{{??}}</b><br><b>{{=s.description}}</b><br><b>{{?}}</b></td>
  </tr>
  <b>{{~}}</b><br><b>{{?}}</b>
  </table>
  <b>{{~}}</b>