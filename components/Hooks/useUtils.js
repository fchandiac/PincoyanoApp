import React, { useState, useEffect } from 'react'
import { useAppContext } from '../../appProvider'

export default function useUtils() {
    const formatRut = (rut) => {
        var valor = rut.replace(/[.-]/g, '')
        valor = valor.replace(/^(\d{1,2})(\d{3})(\d{3})(\w{1})$/, '$1.$2.$3-$4')
        return valor
    }

    const renderMoneystr = (value) => {
        if (value < 0) {
            value = value.toString()
            value = value.replace(/[^0-9]/g, '')
            value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            value = '$ -' + value
            return value
        } else {
            value = value.toString()
            value = value.replace(/[^0-9]/g, '')
            value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            value = '$ ' + value
            return value
        }
    }

    const getExtension = (filename) => {
        return filename.split('.').pop().toLowerCase();
    }

    const isImage = (filename) => {
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        const extension = getExtension(filename);
        return imageExtensions.includes(extension);
    }

    const isWord = (filename) => {
        const wordExtensions = ['doc', 'docx'];
        const extension = getExtension(filename);
        return wordExtensions.includes(extension);
    }

    const isExcel = (filename) => {
        const excelExtensions = ['xls', 'xlsx'];
        const extension = getExtension(filename);
        return excelExtensions.includes(extension);
    };

    const isPDF = (filename) => {
        return getExtension(filename) === 'pdf';
    }


    return {
        formatRut,
        renderMoneystr,
        isImage,
        isWord,
        isExcel,
        isPDF
    }
}