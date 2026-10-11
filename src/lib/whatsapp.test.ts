import { describe, expect, it } from 'vitest';

import {
  buildGeneralQuoteMessage,
  buildQuoteMessage,
  buildServiceQuoteMessage,
  buildWhatsAppLink,
  isWhatsAppConfigured,
  normalizePhoneNumber,
  QUOTE_GREETING,
} from './whatsapp';

describe('normalizePhoneNumber', () => {
  it('normaliza o formato brasileiro mais comum', () => {
    expect(normalizePhoneNumber('5521999999999')).toBe('5521999999999');
  });

  it('aceita o número oficial compartilhado com a Acritech', () => {
    expect(normalizePhoneNumber('+55 (21) 98417-3233')).toBe('5521984173233');
  });

  it('remove máscaras, espaços e o prefixo internacional 00', () => {
    expect(normalizePhoneNumber('+55 (21) 99999-9999')).toBe('5521999999999');
    expect(normalizePhoneNumber('0055 21 99999 9999')).toBe('5521999999999');
  });

  it('aceita telefone fixo com 10 dígitos nacionais', () => {
    expect(normalizePhoneNumber('552133334444')).toBe('552133334444');
  });

  it('recusa valores vazios, incompletos ou fora do Brasil', () => {
    expect(normalizePhoneNumber(undefined)).toBeNull();
    expect(normalizePhoneNumber('')).toBeNull();
    expect(normalizePhoneNumber('   ')).toBeNull();
    expect(normalizePhoneNumber('21999999999')).toBeNull();
    expect(normalizePhoneNumber('5511999999')).toBeNull();
    expect(normalizePhoneNumber('552199999')).toBeNull();
    expect(normalizePhoneNumber('1555123456789')).toBeNull();
  });

  it('recusa celular de 11 dígitos sem o nono dígito', () => {
    expect(normalizePhoneNumber('5521812345678')).toBeNull();
  });
});

describe('buildWhatsAppLink', () => {
  it('monta o link wa.me com a mensagem codificada', () => {
    const link = buildWhatsAppLink('5521999999999', 'Olá! Vim pelo site da Bujosa Clima');

    expect(link).toBe(
      'https://wa.me/5521999999999?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Bujosa%20Clima',
    );
  });

  it('codifica os acentos e mantém a mensagem recuperável na URL', () => {
    const message = buildGeneralQuoteMessage();
    const link = buildWhatsAppLink('5521984173233', message);

    expect(link).toContain('https://wa.me/5521984173233?text=');
    expect(link).not.toContain(' ');
    expect(decodeURIComponent(link?.split('text=')[1] ?? '')).toBe(message);
  });

  it('não cria link quando o número não está configurado', () => {
    expect(buildWhatsAppLink(null, 'Olá')).toBeNull();
    expect(buildWhatsAppLink('', 'Olá')).toBeNull();
    expect(buildWhatsAppLink('numero-invalido', 'Olá')).toBeNull();
  });
});

describe('mensagens', () => {
  it('identifica a marca Bujosa Clima em todas as mensagens', () => {
    const messages = [
      buildGeneralQuoteMessage(),
      buildServiceQuoteMessage('instalação de ar-condicionado split'),
      buildQuoteMessage({
        name: 'Ana',
        whatsapp: '21999999999',
        city: 'Niterói',
        service: 'Instalação de Split',
        description: 'Instalar um split na sala.',
      }),
    ];

    messages.forEach((message) => {
      expect(message).toContain('Vim pelo site da Bujosa Clima');
    });
  });

  it('descreve o serviço escolhido no link por serviço', () => {
    expect(buildServiceQuoteMessage('higienização de ar-condicionado')).toBe(
      'Olá! Vim pelo site da Bujosa Clima e gostaria de solicitar um orçamento para higienização de ar-condicionado.',
    );
  });

  it('mantém o texto genérico quando o cliente não escolheu serviço', () => {
    expect(buildGeneralQuoteMessage()).toBe(
      'Olá! Vim pelo site da Bujosa Clima e gostaria de solicitar um orçamento para instalação, manutenção ou higienização de ar-condicionado.',
    );
  });

  it('monta a mensagem do formulário em linhas organizadas', () => {
    const message = buildQuoteMessage({
      name: '  Ana Souza ',
      whatsapp: '(21) 99999-9999',
      city: 'Niterói',
      service: 'Instalação de Split',
      equipment: '',
      description: '  Instalar um split de 12.000 BTUs na sala.  ',
    });

    expect(message).toBe(
      [
        `${QUOTE_GREETING}.`,
        '',
        'Nome: Ana Souza',
        'WhatsApp: (21) 99999-9999',
        'Cidade: Niterói',
        'Serviço desejado: Instalação de Split',
        '',
        'Necessidade: Instalar um split de 12.000 BTUs na sala.',
      ].join('\n'),
    );
    expect(message).not.toContain('Equipamento');
    expect(message).not.toContain('Local');
  });

  it('inclui o equipamento quando informado', () => {
    const message = buildQuoteMessage({
      name: 'Carlos',
      whatsapp: '21988887777',
      city: 'Maricá',
      service: 'Manutenção Preventiva e Corretiva',
      equipment: 'LG Dual Inverter 9.000 BTUs',
      description: 'Equipamento com pouco rendimento.',
    });

    expect(message).toContain('Equipamento\n- Modelo: LG Dual Inverter 9.000 BTUs');
  });

  it('organiza os dados técnicos da instalação quando preenchidos', () => {
    const message = buildQuoteMessage({
      name: 'Fernanda',
      whatsapp: '21977776666',
      city: 'São Gonçalo',
      neighborhood: 'Centro',
      service: 'Instalação de Split',
      brand: 'Samsung',
      capacity: '12.000 BTUs',
      technology: 'Inverter',
      unitDistance: 'Entre 3 e 5 m',
      propertyType: 'Residencial',
      electricalPoint: 'Não sei',
      accessConditions: 'Segundo andar, sem elevador de serviço.',
      description: 'Instalar o split no quarto.',
    });

    expect(message).toContain('Bairro: Centro');
    expect(message).toContain(
      [
        'Equipamento',
        '- Marca: Samsung',
        '- Capacidade: 12.000 BTUs',
        '- Tecnologia: Inverter',
        '- Distância aproximada entre as unidades: Entre 3 e 5 m',
      ].join('\n'),
    );
    expect(message).toContain(
      [
        'Local',
        '- Tipo de imóvel: Residencial',
        '- Ponto elétrico adequado: Não sei',
        '- Acesso e condições de instalação: Segundo andar, sem elevador de serviço.',
      ].join('\n'),
    );
  });

  it('não cria seções vazias quando o cliente não informa dados técnicos', () => {
    const message = buildQuoteMessage({
      name: 'Bruno',
      whatsapp: '21966665555',
      city: 'Niterói',
      service: 'Higienização',
      brand: '   ',
      capacity: '',
      description: 'Higienizar dois aparelhos.',
    });

    expect(message).not.toContain('Equipamento');
    expect(message).not.toContain('Local');
    expect(message).not.toContain('Bairro');
  });
});

describe('isWhatsAppConfigured', () => {
  it('indica o estado de configuração pendente', () => {
    expect(isWhatsAppConfigured(undefined)).toBe(false);
    expect(isWhatsAppConfigured('')).toBe(false);
    expect(isWhatsAppConfigured('5521984173233')).toBe(true);
  });
});
