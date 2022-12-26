var tree = "";
var vis = "";
var g="";
var zoom = d3.behavior.zoom()
    .scaleExtent([.2,4])
    .on("zoom",zoomed);
var defs ;
var arrowMarker;
var barHeight=60,barWidth=100;

function zoomed(){
    vis.attr("transform","translate("+d3.event.translate+")scale("+d3.event.scale+")")
}
var CollapsibleTree = function(elt,width,height) {
    var m = [20, 120, 20, 120],
      i = 0,
      root,
      root2,
    length = 0;
    var dec=50;

  var tonal = d3.svg.diagonal()
      .source(function(d) { return {"x":d.source.x, "y":d.source.y+barHeight}; })
      .target(function(d) { return {"x":d.target.x, "y":d.target.y}; })
      .projection(function(d) {
          return [d.x, -d.y];
      });

  var donal = d3.svg.diagonal()
      .source(function(d) { return {"x":d.source.x, "y":d.source.y+barHeight}; })
      .target(function(d) { return {"x":d.target.x, "y":d.target.y}; })
      .projection(function(d) {
          return [d.x, d.y-barHeight];
      });

  var that = {
    init: function(json) {
      var that = this;
      //d3.json(url, function(json) {
        root = json;
        root.children.forEach(that.toggleAll);
        root.parents.forEach(that.toggleAll);
        var l1=0,l2=0;

          if(root.children) {
              l1 = root.children.length ;
          }else if(root._children){
              l1=root._children.length;
          }
          if(root.parents){
              l2 = root.parents.length;
          }else if(root._parents){
              l2=root._parents.length;
          }
          if(l1>l2){
              length=l1;
          }else {
              length=l2;
          }
          console.log(444444444444,length)

          var w = length*barWidth+barWidth,
              h = height;
          tree = d3.layout.tree();
          tree.size([1200, 600]);


          vis = d3.select(elt).append("svg:svg")
              .attr("width", w )
              .attr("height", h)
              .call(zoom)
              .on("dblclick.zoom", null)
              .append("svg:g")
              .attr("transform", "translate("+(0)+","+((h+ m[0] + m[2])/2)+")");



          defs = d3.select("svg").append("svg:defs");
          arrowMarker = defs.append("marker")
              .attr("id","arrow")
              .attr("markerUnits","strokeWidth")
              .attr("markerWidth","12")
              .attr("markerHeight","12")
              .attr("viewBox","0 0 12 12")
              .attr("refX","6")
              .attr("refY","6")
              .attr("orient",90)

          var arrow_path = "M2,2 L10,6 L2,10 L6,6 L2,2";

          arrowMarker.append("path")
              .attr("d",arrow_path)
              .attr("fill","steelblue");

          root.x0 = 600;
          root.y0 = h / 2;
        that.updateBoth(root);

      //});
    },

    updateBoth: function(source) {
      var duration = d3.event && d3.event.altKey ? 0 : 0;
      var nodes = tree.nodes(root).reverse();
      nodes.forEach(function(d) {
          d.y = d.depth * 200 ;
      });
      var node = vis.selectAll("g.node")
          .data(nodes, function(d) { return d.id || (d.id = ++i); });
      var tersvg = node.enter().append("svg:g")
          .attr("class", "node")
          .attr("transform", function(d) {
              if( that.isParent(d) ) {
                  return "translate(" + source.x0 + "," + (-source.y0) + ")";
              }else {
                  return "translate(" + source.x0 + "," + (source.y0) + ")";
              }
          })
          .on("click", function(d) {
              that.toggle(d); that.updateBoth(d);
          });


        var datesvg = node.transition()
            .duration(duration)
            .attr("transform", function(d) {
                if( that.isParent(d) ) {
                    return "translate(" + d.x + "," + -d.y + ")";
                } else {
                    return "translate(" + d.x + "," + d.y + ")";
                }
            });

        var xitsvg = node.exit().transition()
            .duration(duration)
            .attr("transform", function(d) {
                if(that.isParent(d) ){
                    return "translate(" + source.x + "," + -source.y + ")";
                }else {
                    return "translate(" + source.x + "," + source.y + ")";
                }})
            .remove();

      tersvg.append("svg:rect")
          .attr("y",function (d) {return that.jude(d)})
          .attr("x", -barWidth / 2)
          .attr("height", barHeight)
          .attr("width", barWidth)
          .style("fill", function(d) {
              return (d._children||d._parents) ? "lightsteelblue" : "transparent";
          });

        datesvg.select("rect")
            .attr("y", function (d) {return that.jude(d)})
            .attr("x", -barWidth / 2 )
            .attr("height", barHeight)
            .attr("width", barWidth)
            .style("fill", function(d) { return (d._children||d._parents) ? "lightsteelblue" : "transparent"});

        xitsvg.select("rect")
            .attr("y", function (d) {return that.jude(d)})
            .attr("x", -barWidth / 2)
            .attr("height", barHeight)
            .attr("width", barWidth);

      var texts=tersvg.append("svg:text")
          .attr("x", function(d) {
            if( that.isParent(d) ) {
              return -10;
            } else {
              return d.children || d._children ? -10 : 10;
            }
          })
          .attr("y",function (d) {return that.jude(d,-8)})
          .attr("dy", "0.35em")
          .attr("width","100px")
          .attr("height","50px")
          .attr("text-anchor", "middle")
          .style("fill-opacity", 1e-6)
            .selectAll("tspan")
          .data(function(d) {
              var arr=[];
              for (var i=0;i<Math.ceil(d.name.length/8);i++){
                  arr.push(
                      d.name.substring(i*8,(i+1)*8)
                  );
              }
              return arr;
          })
            .enter()
            .append("tspan")
            .attr("x", 0)
            .attr("dy","1em")
            .text(function(d){
                return d
            });

      datesvg.select("text")
          .attr("y",function (d) {return that.jude(d,-8)})
          .attr("x", 0 )
          .attr("width","100px")
          .attr("height","50px")
          .attr("text-anchor", "middle")
          .style({"fill-opacity": 1,
                    "text-align": "center",
                    "word-break": "break-word",
                    "width": "100px",
                    "white-space": "nowrap"});

      xitsvg.select("text")
         .attr("y", function (d) {return that.jude(d,-8)})
          .style("fill-opacity", 1e-6);

        tersvg.append("svg:text")
            .attr("y",function (d) {
                if(d.hasOwnProperty("father")||d.isparent){
                    return 5;
                }else{
                    return  -barHeight-5;
                }
            })
            .attr("x", 10)
            .attr("class", "textpath")
            .attr("dy", "0.35em")
            .text(function(d){
                return d.value
            });



      var link = vis.selectAll("path.link")
          .data(tree.links_parents(nodes).concat(tree.links(nodes)), function(d) {
              //console.log(434343434,d ,d.target.id)
              return   d.target.id; })


      link.enter()
          .insert("svg:path", "g")
          .attr("class", "link")
          .attr("d", function(d) {
            var o = {x: source.x0, y: source.y0 };
            if( that.isParent(d.target) ) {
              return tonal({source: o, target: o});
            } else {
              return donal({source: o, target: o});
            }
          })
          .attr("id", function(d, i){
              return d.target.id;
          })
          .attr("marker-end","url(#arrow)")
          .transition()
          .duration(duration)
          .attr("d", function(d) {
              var o = {x: source.x0, y: source.y0 };
              if( that.isParent(d.target) ) {
             return tonal({source: o, target: o});
            } else {
              return donal({source: o, target: o});
            }
          });

      link.transition()
          .duration(duration)
          // .attr("d", tonal);
          .attr("d", function(d) {
            if( that.isParent(d.target) ) {
              return tonal(d);
            } else {
              return donal(d);
            }
          })

      link.exit().transition()
          .duration(duration)
          .attr("d", function(d) {
            var o = {x: source.x, y: source.y};
            var p = {x: d.source.x0, y: source.y0 +100};

            if( that.isParent(d.target) ) {
              return tonal({source: o, target: o});
            } else {
              return donal({source: o, target: o});
            }

          })
          .remove();

        nodes.forEach(function(d) {
            d.x0 = d.x;
            d.y0 = d.y;
      });
    },
      jude:function(d,num) {
          num= num?num:0;

        if(d.hasOwnProperty("root")){

            return  -num -barHeight;
        }else if(d.hasOwnProperty("father")||d.isparent){

            return -num -6 -barHeight;
        }else{

            return  -num +6 -barHeight;
        }
    },

    isParent: function(node) {
      if( node.parent && node.parent != root ) {
        return this.isParent(node.parent);
      } else if( node.isparent ) {
        return true;
      } else {
        return false;
      }
    },
    toggle: function(d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      if (d.parents) {
        d._parents = d.parents;
        d.parents = null;
      } else {
        d.parents = d._parents;
        d._parents = null;
      }
    },
    toggleAll: function(d) {
      if (d.children) {
        d.children.forEach(that.toggleAll);
        that.toggle(d);
      }
      if (d.parents) {
        d.parents.forEach(that.toggleAll);
        that.toggle(d);
      }
    }
  };
  return that;
};
