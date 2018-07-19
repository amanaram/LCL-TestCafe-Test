import { Selector } from 'testcafe';

fixture `Sorting Verification`
    .page('https://www.loblaws.ca/');    

test('Search for Apples and sort by price', async t => {
    
    const searchInput = Selector('#search-bar');
    const sortButton = Selector('.btn.btn-link.btn-sort-link').nth(2);
    const applesPrice = Selector ('.reg-price-text');
    var sortedPrice = [];


    await t
    
        .typeText(searchInput, 'apples')
        .pressKey('enter')
        .click(sortButton);

        var productCount = await applesPrice.count;
        //console.log('Product Count: ' + productCount + '/n');
    
        for(let i=0; i < productCount; i++){
            sortedPrice[i] = await applesPrice.nth(i).innerText;
            sortedPrice[i] = reEscape(sortedPrice[i]);
            //console.log ('Item: '+ i + ' Price: ' + sortedPrice[i]);
            
        }

        var verifySort = await sortedPrice.sort(function(a, b){return b - a});

        for(let j=0; j<productCount; j++)
        {
            await t.expect(sortedPrice[j]).eql(verifySort[j]);
            //console.log ('Item: '+ j + ' Sort on Site:    ' + sortedPrice[j]);
            //console.log ('Item: '+ j + ' Javascript Sort: ' + verifySort[j]);
            //console.log('--------------------------------');
        }
        
        function reEscape(s) {
            return s.replace(/([*+?^$|(){}\[\]])/mg, "");
        }
});


fixture `Deals Present in Results`
    .page('https://www.realcanadiansuperstore.ca/');

test('Search for Oranges with deal badge', async t => {
    const modal = Selector('.select-province.btn.btn-primary').withText('Ontario');
    const searchBar = Selector('#search-bar');
    const flyerdealExists = Selector('.deal-type');

    await t
        .click(modal)
        .typeText(searchBar, 'oranges')
        .pressKey('enter')
        .expect(flyerdealExists).ok();
});