				var renderHtml = "<a href='" + item.url + "' >";
                renderHtml += 	"<div class='code'>" + item.code +"</div>";
                var customerName = (item.customerFirstName!=null?(item.customerFirstName+' '):'') + (item.customerName!=null?item.customerName:'');

                if (customerName.length != 0) {
                    renderHtml += 	"<div class='customerName'>" + customerName +"</div>";
                }
                if (item.totalPrice != null){
                    renderHtml += "<div class='totalPrice'>" + item.totalPrice + "</div>";
                }
                renderHtml += 	"</a>";
