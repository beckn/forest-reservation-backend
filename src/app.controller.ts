import { Controller, Get, Post, UseGuards, Request, Body, Render, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('dsep/search')
  getCoursesFromFln(@Body() body: any) {
    return this.appService.getContent(body);
  }

  @Post('dsep/select')
  selectCourse(@Body() body: any) {
    return this.appService.handleSelect(body);
  }

  @Post('dsep/init')
  initCourse(@Body() body: any) {
    return this.appService.handleInit(body);
  }

  @Post('dsep/confirm')
  confirmCourse(@Body() body: any) {
    return this.appService.handleConfirm(body);
  }


  @Post('dsep/rating')
  giveRating(@Body() body: any) {
    console.log("rating api calling")
    return this.appService.handleRating(body);
  }

  @Get('feedback/:id')
  @Render('feedback') 
  getFeedbackForm(@Param('id') id: string) {
    return {id};
  }

  @Post('/submit-feedback/:id')
   submitFeedback(@Body('description') description: string,@Param('id') id: string) {
   return this.appService.handleSubmit(description, id);
  }

  //mobility
  @Post('mobility/search')
  getContentFromIcar1(@Body() body: any) {
    console.log("search api calling")
    return this.appService.getContent(body);
  }

  @Post('mobility/select')
  selectCourse1(@Body() body: any) {
    console.log("select api calling")
    return this.appService.handleSelect(body);
  }

  @Post('mobility/init')
  initCourse1(@Body() body: any) {
    console.log("init api calling")
    return this.appService.handleInit(body);
  }

  @Post('mobility/confirm')
  confirmCourse1(@Body() body: any) {
    console.log("confirm api calling")
    return this.appService.handleConfirm(body);
  }
}
