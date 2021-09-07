"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    async upload(request, response) {
        // #swagger.tags = ['Upload']
        // #swagger.description = 'Endpoint para fazer upload de arquivos.'
        /* #swagger.parameters['multipart/form-data'] = {
                  in: 'formData',
                  required: true,
                  name:'image',
                  description: 'image',
                  type: 'file',
        } */
        const { location: url = '' } = request.file;
        return response.status(200).json({
            status: 200,
            url
        });
    }
};
