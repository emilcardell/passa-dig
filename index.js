const puppeteer = require('puppeteer');
var player = require('play-sound')(opts = {})

const getMeOutSweden = async () => {
   try {

   
  console.log('starting script')
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://bokapass.nemoq.se/Booking/Booking/Index/stockholm');
  await page.screenshot({ path: 'example.png' });

  const startButton = await page.$('#Main > div.row-fluid > div:nth-child(1) > div > form > div.control-group.text-center > input');
  await startButton.evaluate( form => form.click() );
  await page.waitForTimeout(1000);
  const checkBox = await page.$("#AcceptInformationStorage");
  await checkBox.evaluate( form => form.click() );

  const firstNextButton = await page.$('#Main > form > div.btn-toolbar > input');
  await firstNextButton.evaluate( form => form.click() );
  
  await page.waitForTimeout(2000);
  const borISvea = await page.$('#ServiceCategoryCustomers_0__ServiceCategoryId');
  await borISvea.evaluate( form => form.click() );

  const secondNextButton = await page.$('#Main > form > div.btn-toolbar > input');
  await secondNextButton.evaluate( form => form.click() );
  await page.waitForTimeout(1000);
  const findClosestTimeButton = await page.$('#Main > form:nth-child(9) > div > div:nth-child(8) > div > input:nth-child(2)');
  await findClosestTimeButton.evaluate( form => form.click() );

  await page.waitForTimeout(1500);
  const booking = await page.evaluate(() => {
    const date = document.querySelector("#datepicker").value;
    console.log(date);

    if(new Date(date).getTime() > new Date('2022-07-20').getTime()) {
        return {book: false, date};
    }

    return {book: true, date};;

 });

 console.log(booking);

 if(booking.book) {
    await page.waitForNetworkIdle();
    const timePills = await page.$$('.timetable .timecell');
    await timePills[0].evaluate( form => form.click() );
  
    const thirdNextButton = await page.$('#booking-next');
    await thirdNextButton.evaluate( form => form.click() );

    player.play('horn.mp3', function(err){
        if (err) throw err
    })

    await page.waitForTimeout(1000 * 60 * 4);
    await browser.close();
 } else {
    await browser.close();
 }

} catch(error) {
   console.log(error);
}
};

(asyc => getMeOutSweden())();

setInterval(getMeOutSweden, 1000 * 60);