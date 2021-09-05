import { Request, Response } from 'express';

export default {
  async upload(request: Request, response: Response) {
    // #swagger.tags = ['Upload']
    // #swagger.description = 'Endpoint para fazer upload de arquivos.'
    /* #swagger.parameters['multipart/form-data'] = {
              in: 'formData',
              required: true,
              name:'image',
              description: 'image',
              type: 'file',
    } */
    const { location: url = '' } = request.file as Express.Multer.File;

    return response.status(200).json({
      status: 200,
      url
    });
  }
}