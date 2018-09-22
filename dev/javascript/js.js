var arr = [
	{model: 'Платье-миди с расклешенной юбкой',color: 'синий',img: 'img/icons/item__pic1.png',size: 44,index: '82039-11',price: 2450,count: 1,},
	{model: 'Туфли женские украшенные кружевными вставками',color: 'черный',img: 'img/icons/item__pic2.png',size: 38,index: '13524-01',price: 2450,count: 1},
	{model: 'Платье-миди',color: 'белый',img: 'img/icons/item__pic3.png',size: 44,index: '75039',price: 2450,count: 1},
	{model: 'Платье-миди',color: 'белый',img: 'img/icons/item__pic3.png',size: 46,index: '75039',price: 2450,count: 1}
	];
var cart = {
		items: [],
		promocode: 0,
		addItem: function(obj){
					this.items.push(obj);
					this.update();
				},
		deleteItem: function(model,size){
						var j = this.searchItem(model,size);
						if(j != undefined) {
							this.items.splice(j,1) 
						};
						this.update();
					},
		Allcount: function(){
					 var count = this.items.reduce(function(acc,item){
									if (item.count > 0) {
										return acc + item.count;
									}
									return acc;
								},0)

					qs('.Basket__count').innerHTML = count;
					},
		updateItem: function(move,model,size){
						var j = this.searchItem(model,size);
						if (move == '+') {
							this.items[j].count += 1;
						};
						if (move == '-' ) {
							this.items[j].count -= 1;
						};
						this.update();
					},
		ShowAllSumm: function(){
					var allsumm = this.items.reduce(function(acc,item){
						item.summ = item.count * item.price;
						return acc + item.summ;
					},0);
					qs('.Summary__summ').innerHTML = allsumm.toLocaleString() + ' руб.';
					return allsumm;
				},
		getsumm: function(model,size){
						var j = this.items.reduce(function(acc,item){
						if(item.model == model && item.size == size){
							return acc + item.summ;
						}
						return acc;
						},0);
						return j;
					},
		searchItem: function(model,size){
						return this.items.reduce(function(acc,item,i){
							if(item.model == model && item.size == size){
								return i;
							}
							return acc;
						},0)
					},
		summPromo: function(){
					 var a = cart.ShowAllSumm() - this.promocode;
					 this.promocode === 0 ? qs('.Summary__promoSumm').innerHTML = 0 + ' руб.' : qs('.Summary__promoSumm').innerHTML = '-'+this.promocode.toLocaleString()+' руб.';
					 qs('.Summary__summAll').innerHTML = a.toLocaleString() + ' руб.';
					},
		update: function(){
			this.Allcount();
			this.ShowAllSumm();
			this.summPromo();
		}
};



window.onload = function() {
	arr.forEach(function(element){
		createItem(element);
		cart.addItem(element);
	});
		

	var ItemsNodes = document.querySelectorAll('.Item.Item_indent');
	for (var i = 0; i < ItemsNodes.length; i++) {
		ItemsNodes[i].addEventListener('click',function(event){
			var target = event.target;
			var currentTarget = event.currentTarget;
			var model = event.currentTarget.getAttribute('data-model');
			var size = event.currentTarget.getAttribute('data-size');
				switch(target.getAttribute('data-move')){
					case'del' : 
						cart.updateItem('-',model,size)
						target.nextElementSibling.innerHTML --;
						if (target.nextElementSibling.innerHTML == 0) {
							cart.deleteItem(model,size);
							currentTarget.parentElement.removeChild(currentTarget);
						}
						break;
					case'add' : 
						cart.updateItem('+',model,size)
						target.previousElementSibling.innerHTML ++;
						currentTarget.querySelector('.Price__input').innerHTML = cart.getsumm(model,size).toLocaleString();
						break;
					case'close' : 
						cart.deleteItem(model,size);
						currentTarget.parentElement.removeChild(currentTarget);
						fixFooter();
						break;
				};

		});

	};

	var promoButton = qs('.Button_promo');
	var promoInput  = qs('.Promo__input');

	promoButton.addEventListener('click',function(e){
		var promoNode = qs('.Promo')
			if(promoInput.value.trim() == 123456){
				cart.promocode = 1800;
				cart.summPromo();
			}
	});
	function fixFooter(){
		var pageNode = qs('.Page');
		var contentNode = qs('.Section_Content');
		var footerNode = qs('.Section_Footer');
		var addNode = qs('.Content__wrapper_add');

		if (document.querySelector('.Basket__count').innerHTML == 0) {
			pageNode.classList.add('Page_flex');
			contentNode.classList.add('Section_ContentFlex');
			footerNode.classList.add('Section_FooterFlex');
			addNode.parentElement.removeChild(addNode);

		}else if (pageNode.classList.contains('Page_flex')){
			pageNode.classList.remove('Page_flex');
			contentNode.classList.remove('Section_ContentFlex');
			footerNode.classList.remove('Section_FooterFlex');
		}
	}
};


function createItem(obj){
	var itemNode = cn('div','Item Item_indent');
	var gridNode = cn('div','Grid');
	var gridItemNode = cn('div','Grid__item');
	var gridItem2Node = cn('div','Grid__item Grid__item_top');

	var itemImg = cn('img','Item__img','','src', obj.img,'alt', 'pic');
	var itemInfo = cn('div','Item__info');
	var itemModel = cn('div','Item__model',obj.model);
	var itemIndex = cn('div','Item__index','Код: ' + obj.index);
	var itemSize = cn('div','Item__size','Размер: ' + obj.size);
	var itemColor = cn('div','Item__color','Цвет: ' + obj.color);
	itemInfo.appendChild(itemModel);
	itemInfo.appendChild(itemIndex);
	itemInfo.appendChild(itemSize);
	itemInfo.appendChild(itemColor);


	var count = cn('div','Count');
	var buttonDel = cn('button','Count__del','-','data-move','del');
	var counter = cn('div','Count__counter',obj.count);
	var buttonPlus = cn('button','Count__plus','+','data-move','add');
	count.appendChild(buttonDel);
	count.appendChild(counter);
	count.appendChild(buttonPlus);

	var price = cn('div','Price');
	var priceInput = cn('div','Price__input',obj.price.toLocaleString());
	var priceEu = cn('span','Price__Eu','руб.');
	price.appendChild(priceInput);
	price.appendChild(priceEu);

	var close = cn('div','Close','','data-move','close');

	gridItemNode.appendChild(itemImg);
	gridItemNode.appendChild(itemInfo);
	gridItem2Node.appendChild(count);
	gridItem2Node.appendChild(price);
	gridItem2Node.appendChild(close);
	gridNode.appendChild(gridItemNode);
	gridNode.appendChild(gridItem2Node);
	itemNode.appendChild(gridNode);

	itemNode.setAttribute('data-model',obj.model);
	itemNode.setAttribute('data-size',obj.size);

	var container = qs('.Cart__wrapper_items');
	container.appendChild(itemNode);
}
function cn(tag,classCss,text,atrType,artValue,atrType2,artValue2){
	var element = document.createElement(tag);

	element.className = classCss;
	element.innerHTML = text || '';
	if(atrType != undefined & artValue != undefined){
		element.setAttribute(atrType,artValue)}
	if(atrType2 != undefined & artValue2 != undefined){
		element.setAttribute(atrType2,artValue2)}
	return element;
};
function qs(css){
	return document.querySelector(css);
};
