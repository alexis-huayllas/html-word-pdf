/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, Put } from '@nestjs/common';
import { BibliotecaService } from './biblioteca.service';
import { CreateBibliotecaDto } from './dto/create-biblioteca.dto';
import { UpdateBibliotecaDto } from './dto/update-biblioteca.dto';
import { Biblioteca } from './schemas/biblioteca.schema';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as fs from 'fs';
import { Response, Request, response } from 'express';
import * as cheerio from 'cheerio';
import * as mammoth from "mammoth";
import * as pdf from 'html-pdf';


class WordtoPdfbase64Dto {
  @ApiProperty({ type:'string', description: 'id del template', required: true })
  id: string;
  @ApiProperty({ type:'string', description: 'archivo word en base64', required: true })
  word: string;
}


@ApiTags('biblioteca')
@Controller('biblioteca')
export class BibliotecaController {
  constructor(private readonly bibliotecaService: BibliotecaService) {}

  @Post()
  async create(@Body() createBibliotecaDto: CreateBibliotecaDto, @Res() response: Response) {
    try {
      // eslint-disable-next-line prefer-const
      let data=await this.bibliotecaService.create(createBibliotecaDto);
      response.status(200).json({status:200,error:true,mensaje:"se ejecuto correctamente",response:data});
      //return data;
    } catch (error) {
      response.status(400).json({status:400,error:false,mensaje:"se produjo un error al consultar a la base de datos",response:error});
    }
  }

  @Get()
  async findAll( @Res() response: Response)/*:Promise<Biblioteca[]>*/ {
    try {
      // eslint-disable-next-line prefer-const
      let data= await this.bibliotecaService.findAll();
      response.status(200).json({status:200,error:false,mensaje:"se ejecuto correctamente",response:data});
    } catch (error) {
      response.status(400).json({status:400,error:true,mensaje:"se produjo un error al consultar a la base de datos",response:error});
    }
    //return
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response: Response)/*:Promise<Biblioteca>*/ {
    try {
      // eslint-disable-next-line prefer-const
      let data= await this.bibliotecaService.findOne(id);
      response.status(200).json({status:200,error:false,mensaje:"se ejecuto correctamente",response:data});
    } catch (error) {
      response.status(400).json({status:400,error:true,mensaje:"se produjo un error al consultar a la base de datos",response:error});
    }
    //return 
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBibliotecaDto: UpdateBibliotecaDto, @Res() response: Response)/*:Promise<Biblioteca>*/ {
    //return 
    try {
      // eslint-disable-next-line prefer-const
      let data= await this.bibliotecaService.update(id, updateBibliotecaDto);
      response.status(200).json({status:200,error:false,mensaje:"se ejecuto correctamente",response:data});
    } catch (error) {
      response.status(400).json({status:400,error:true,mensaje:"se produjo un error al consultar a la base de datos",response:error});
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response: Response) {
    //console.log(id);
    //return 
    try {
      // eslint-disable-next-line prefer-const
      let data= await this.bibliotecaService.remove(id);
      response.status(200).json({status:200,error:false,mensaje:"se ejecuto correctamente",response:data});
    } catch (error) {
      response.status(400).json({status:400,error:true,mensaje:"se produjo un error al consultar a la base de datos",response:error});
    }
  }

  @ApiOperation({ summary: 'WORD to PDF' })
  @ApiResponse({ status: 200, description: 'Convert the WORD to PDF' })
  @ApiResponse({ status: 400, description: 'Error al convertir archivo' })
  @Post('wordbase64-to-base64pdf')
  //@ApiConsumes('application/json')
  //@ApiBody({ type: WordtoPdfbase64Dto })
  //@ApiQuery({ name: 'htmlTxt', required: false })
  async convertwordtopdf(
    @Res() response: Response,
    @Req() request: Request,
    //@Query('htmlTxt') htmlTxt: string,
    @Body() body: WordtoPdfbase64Dto,
  ) {
    // eslint-disable-next-line prefer-const
    let datatemplate= await this.bibliotecaService.findOne(body.id);
    console.log('datatemplate');
    console.log(datatemplate);

    const pdfPath = `${__dirname}/uploads/${Date.now()}.pdf`;
    let html = '';
    let wordPath = '';

    /*if (htmlTxt !== undefined) {
      html = htmlTxt;
    } else {*/
      html = Buffer.from(body.word, 'base64').toString('utf8');
      if(html.includes('[Content_Types].xml')){
        wordPath = `${__dirname.replace(/dist\\convert/g, 'uploads/')}${Date.now()}.docx`;
        await fs.writeFileSync(wordPath,html);
      }
      else{
        html=body.word;
        /*if(html.includes('</body>')){
          html=html.replace('<body>',"<body><div style='width:3cm;height: 100%;display:inline-block;'><h1 style='width: 0.5cm;word-wrap: break-word; margin: auto;'>UATF</h1></div><div style='width: 27cm;height: 100%;display:inline-block;'>");
          html=html.replace('</body>',"</div><div style='width:3cm;height: 100%;display: inline-block;float: right;'><h1 style='width: 0.5cm;word-wrap: break-word; margin: auto;'>UATF</h1></div></body>");
        }*/
      }
    //}

    const $ = cheerio.load(html);
    const pageSize = $('meta[name="page-size"]').attr('content');
    let format: 'A3' | 'A4' | 'A5' | 'Legal' | 'Letter' | 'Tabloid' = 'Letter';

    if (['A3', 'A4', 'A5', 'Legal', 'Letter', 'Tabloid'].includes(pageSize)) {
      format = pageSize as 'A3' | 'A4' | 'A5' | 'Legal' | 'Letter' | 'Tabloid';
    }

    const currentDate = new Date().toLocaleDateString('es-Es');
    let header='';
    let footer='';
    if(datatemplate.header!==''){
      header=datatemplate.header;
    }
    if(datatemplate.header!==''){
      footer=datatemplate.footer;
      if (footer.includes('${currentDate}')) {
        console.log('reeemplaza♂0do',currentDate);
        footer=footer.replace('${currentDate}',currentDate);
        console.log(footer);
      }
    }

    const options: pdf.CreateOptions = {
      format: format,
      orientation: 'portrait',
      header: {
        height: '30mm',
        contents: `${header}`,
        /*contents: `
          <div style="text-align: center;">
            <span style="font-size: 20px; font-weight: bold;">
              UNIVERSIDAD AUTONOMA TOMAS FRIAS
              <br>
              INGENIERIA DE SISTEMAS
              <br>
              <div style="border-top: 2px solid black; margin: 0 auto; width: 85%;"></div>
          </div>`,*/
      },
      footer: {
        height: '30mm',
        contents: `${footer}`,
        /*contents: `
          <div style="text-align: center; font-size: 12px; color: #444;width:100%;">
              <hr style="border: none; border-top: 1px solid black; margin: 5px auto; width: 85%;">
              <div>Fecha de impresión: ${currentDate}</div>
            </div>
          `,*/
      },
      border:{
        left:"2cm",//"<div style='width:3cm;height: 100%;display:inline-block;'><h1 style='width: 0.5cm;word-wrap: break-word; margin: auto;'>UATF</h1></div>",
        right:"2cm"//"<div style='width:3cm;height: 100%;display: inline-block;float: right;'><h1 style='width: 0.5cm;word-wrap: break-word; margin: auto;'>UATF</h1></div>"
      }
    };

    if (wordPath!=='' && (wordPath.includes('.docx') || wordPath!==''&& wordPath.includes('.doc'))) {
      const buffer = Buffer.from(body.word, 'base64');
      
      mammoth.convertToHtml({ buffer:buffer }).then(function (result) {
        html=result.value;
        /*html = "<div style='width:3cm;height: 100%;display:inline-block;'><h1 style='width: 0.5cm;word-wrap: break-word; margin: auto;'>UATF</h1></div><div style='width: 27cm;height: 100%;display:inline-block;'>"
        +result.value
        +"</div><div style='width:3cm;height: 100%;display: inline-block;float: right;'><h1 style='width: 0.5cm;word-wrap: break-word; margin: auto;'>UATF</h1></div>";*/
        console.log(html);

        pdf.create(html, options).toFile(pdfPath, function (err, res) {
          if (err) {
            console.log(err);
            response.status(400).json({status:400,error:true,mensaje:"se produjo un error al consultar a la base de datos",response:err});
          } else {
            console.log(res);
            const pdfContent = fs.readFileSync(pdfPath, 'base64');
            fs.unlinkSync(pdfPath);
            if (wordPath!=='') {
              fs.unlinkSync(wordPath);            
            }
            response.status(200).json({status:200,error:false,mensaje:"se ejecuto correctamente",response:pdfContent});
          }
        });
      });
    } else {
      pdf.create(html, options).toFile(pdfPath, function (err, res) {
        if (err) {
          console.log(err);
          response.status(400).json({status:400,error:true,mensaje:"se produjo un error al consultar a la base de datos",response:err});
        } else {
          console.log(res);
          const pdfContent = fs.readFileSync(pdfPath, 'base64');
          fs.unlinkSync(pdfPath);
          if (wordPath!=='') {
            fs.unlinkSync(wordPath);            
          }
          response.status(200).json({status:200,error:false,mensaje:"se ejecuto correctamente",response:pdfContent});
        }
      });
    }
  }


}


