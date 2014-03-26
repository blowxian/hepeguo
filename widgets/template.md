<h1>controls 数据详述</h1>
<b>{{~ it:v}}</b><br>
<a name="{{=v.name}}"/>

<h2> {{=v.name}}</h2>
<h3>1. 控件说明</h3>
{{=v.package.description}}

<h3>2. 控件接口 </h3>
<h4>2.1 控件基本信息 (package.json)</h4>
此文件用于描述控件的基本信息：  
<ul>
   <li>控件版本号：<b>{{=v.package.version}}</b></li>
   <li>控件开发人员：<a href="Mailto:{{=v.package.mail}}"><b>{{=v.package.author}}</b></a></li>
</ul>

<h4>2.2 控件配置参数 (options.json)</h4>
此文件用于描述控件可配置的参数信息： 
  <table>
  <tr style="background-color:rgb(200,200,200)">
    <th>接口名称</th>
    <th>接口值类型</th>
    <th>接口描述</th>
    <th>默认值</th>
  </tr>
  <b>{{~ v.options:t}}</b>
  <tr>
    <td><b>{{=t.name}}</b></td>
    <td><b>{{=t.type}}</b></td>
    <td>{{=t.description}}<br><b>{{? t.options}}</b><br><b>{{~ t.options:h}}</b><ul><li><b>{{=h.value}}</b>：{{=h.text}}</li></ul><b>{{~}}</b><br><b>{{?? t.item}}</b><br><b>{{~ t.item:i}}</b><br><b>{{? i.options}}</b><ul><li><b>{{=i.name}}</b>：{{=i.type}}，{{=i.description}}<br><b>{{~ i.options:o}}</b><ul><li><b>{{=o.value}}</b>：{{=o.text}}</li></ul><b>{{~}}</b><br></li></ul><b>{{??}}</b><ul><li><b>{{=i.name}}</b>：{{=i.type}}，{{=i.description}}</li></ul><b>{{?}}</b><br><b>{{~}}</b><br><b>{{?}}</b></td>
    <td><b>{{? t.default}}</b><br><b>{{=t.default}}</b><br><b>{{?}}</b></td>
  </tr>
  <b>{{~}}</b>
</table>


<h4>2.3 发送信号参数 (signals.json)</h4>
<b>{{? v.signals}}</b><br>
此文件用于描述控件发出的signal事件及参数信息：
  <table>
  <tr style="background-color:rgb(200,200,200)">
    <th>接口名称</th>
    <th>接口值类型</th>
    <th>接口描述</th>
  </tr>
  <b>{{~ v.signals:s}}</b>
    <tr>
    <td><b>{{=s.name}}</b></td>
    <td><b>{{? s.params && s.params.length!==0}}</b><br><b>{{~ s.params:p}}</b><ul>
   <li><b>{{=p.type}}</b> - {{=p.description}}</li></ul><b>{{~}}</b><br><b>{{??}}</b><br>无需绑定参数<br><b>{{?}}</b></td>
    <td>{{=s.description}}</td>
  </tr>
  <b>{{~}}</b>
  </table>
  <b>{{??}}</b><br>
  无
  <br><b>{{?}}</b>

<h4>2.4 信号处理参数 (slots.json)</h4>
<b>{{? v.slots}}</b><br>
此文件用于描述控件接收到signal事件以后的处理方法及参数信息：
 <table>
  <tr style="background-color:rgb(200,200,200)">
    <th>接口名称</th>
    <th>接口值类型</th>
    <th>接口描述</th>
  </tr>
  <b>{{~ v.slots:s}}</b>
    <tr>
    <td><b>{{=s.name}}</b></td>
    <td><b>{{? s.params && s.params.length!==0}}</b><br><b>{{~ s.params:p}}</b><ul>
   <li><b>{{=p.type}}</b> - {{=p.description}}</li></ul><b>{{~}}</b><br><b>{{??}}</b><br>无需绑定参数<br><b>{{?}}</b></td>
    <td>{{=s.description}}</td>
  </tr>
  <b>{{~}}</b>
  </table>
 <b>{{??}}</b><br>
  无
  <br><b>{{?}}</b><br>
  <br><b>{{~}}</b><br>
  <br><br>
  <b>{{? it.date}}</b><br>－－－－－－－－ 最近修改日期：{{=it.date}} －－－－－－－－<br><b>{{?}}</b>