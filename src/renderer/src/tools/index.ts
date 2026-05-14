import { tool as base64FileConverter } from './base64-file-converter';
import { tool as base64StringConverter } from './base64-string-converter';
import { tool as basicAuthGenerator } from './basic-auth-generator';
import { tool as bcrypt } from './bcrypt';
import { tool as benchmarkBuilder } from './benchmark-builder';
import { tool as cameraRecorder } from './camera-recorder';
import { tool as chronometer } from './chronometer';
import { tool as crontabGenerator } from './crontab-generator';
import { tool as dateTimeConverter } from './date-time-converter';
import { tool as deviceInformation } from './device-information';
import { tool as dockerRunToDockerComposeConverter } from './docker-run-to-docker-compose-converter';
import { tool as emojiPicker } from './emoji-picker';
import { tool as cypher } from './encryption';
import { tool as etaCalculator } from './eta-calculator';
import { tool as gitMemo } from './git-memo';
import { tool as hashText } from './hash-text';
import { tool as hmacGenerator } from './hmac-generator';
import { tool as htmlEntities } from './html-entities';
import { tool as htmlWysiwygEditor } from './html-wysiwyg-editor';
import { tool as httpStatusCodes } from './http-status-codes';
import { tool as ibanValidatorAndParser } from './iban-validator-and-parser';
import { tool as baseConverter } from './integer-base-converter';
import { tool as ipv4AddressConverter } from './ipv4-address-converter';
import { tool as ipv4RangeExpander } from './ipv4-range-expander';
import { tool as ipv4SubnetCalculator } from './ipv4-subnet-calculator';
import { tool as ipv6UlaGenerator } from './ipv6-ula-generator';
import { tool as jsonDiff } from './json-diff';
import { tool as jsonMinify } from './json-minify';
import { tool as jsonToCsv } from './json-to-csv';
import { tool as jsonToToml } from './json-to-toml';
import { tool as jsonToXml } from './json-to-xml';
import { tool as jsonToYaml } from './json-to-yaml-converter';
import { tool as jsonViewer } from './json-viewer';
import { tool as jwtParser } from './jwt-parser';
import { tool as keycodeInfo } from './keycode-info';
import { tool as loremIpsumGenerator } from './lorem-ipsum-generator';
import { tool as macAddressGenerator } from './mac-address-generator';
import { tool as macAddressLookup } from './mac-address-lookup';
import { tool as markdownToHtml } from './markdown-to-html';
import { tool as mathEvaluator } from './math-evaluator';
import { tool as metaTagGenerator } from './meta-tag-generator';
import { tool as mimeTypes } from './mime-types';
import { tool as m3u8Player } from './m3u8-player';
import { tool as otpCodeGeneratorAndValidator } from './otp-code-generator-and-validator';
import { tool as passwordStrengthAnalyser } from './password-strength-analyser';
import { tool as percentageCalculator } from './percentage-calculator';
import { tool as qrCodeGenerator } from './qr-code-generator';
import { tool as randomPortGenerator } from './random-port-generator';
import { tool as regexMemo } from './regex-memo';
import { tool as regexTester } from './regex-tester';
import { tool as rsaKeyPairGenerator } from './rsa-key-pair-generator';
import { tool as sqlPrettify } from './sql-prettify';
import { tool as svgPlaceholderGenerator } from './svg-placeholder-generator';
import { tool as textDiff } from './text-diff';
import { tool as textStatistics } from './text-statistics';
import { tool as textToBinary } from './text-to-binary';

import { tool as textToUnicode } from './text-to-unicode';
import { tool as tokenGenerator } from './token-generator';
import { tool as tomlToJson } from './toml-to-json';
import { tool as tomlToYaml } from './toml-to-yaml';
import type { ToolCategory } from './tools.types';
import { tool as ulidGenerator } from './ulid-generator';
import { tool as urlEncoder } from './url-encoder';
import { tool as urlParser } from './url-parser';
import { tool as userAgentParser } from './user-agent-parser';
import { tool as uuidGenerator } from './uuid-generator';
import { tool as wifiQrCodeGenerator } from './wifi-qr-code-generator';
import { tool as websocketTester } from './websocket-tester';
import { tool as xmlFormatter } from './xml-formatter';
import { tool as xmlToJson } from './xml-to-json';
import { tool as yamlToJson } from './yaml-to-json-converter';
import { tool as yamlToToml } from './yaml-to-toml';
import { tool as yamlViewer } from './yaml-viewer';

export const toolsByCategory: ToolCategory[] = [
  {
    name: 'Crypto',
    components: [
      tokenGenerator,
      hashText,
      bcrypt,
      uuidGenerator,
      ulidGenerator,
      cypher,
      hmacGenerator,
      rsaKeyPairGenerator,
      passwordStrengthAnalyser,
    ],
  },
  {
    name: 'Converter',
    components: [
      dateTimeConverter,
      baseConverter,
      base64StringConverter,
      base64FileConverter,
      textToBinary,
      textToUnicode,
      yamlToJson,
      yamlToToml,
      jsonToYaml,
      jsonToToml,
      tomlToJson,
      tomlToYaml,
      xmlToJson,
      jsonToXml,
      markdownToHtml,
    ],
  },
  {
    name: 'Web',
    components: [
      urlEncoder,
      htmlEntities,
      urlParser,
      deviceInformation,
      basicAuthGenerator,
      metaTagGenerator,
      otpCodeGeneratorAndValidator,
      mimeTypes,
      jwtParser,
      keycodeInfo,
      htmlWysiwygEditor,
      userAgentParser,
      httpStatusCodes,
      jsonDiff,
    ],
  },
  {
    name: 'Images and videos',
    components: [qrCodeGenerator, wifiQrCodeGenerator, svgPlaceholderGenerator, cameraRecorder, m3u8Player],
  },
  {
    name: 'Development',
    components: [
      gitMemo,
      randomPortGenerator,
      crontabGenerator,
      jsonViewer,
      jsonMinify,
      jsonToCsv,
      sqlPrettify,
      dockerRunToDockerComposeConverter,
      xmlFormatter,
      yamlViewer,
      regexTester,
      regexMemo,
    ],
  },
  {
    name: 'Network',
    components: [
      ipv4SubnetCalculator,
      ipv4AddressConverter,
      ipv4RangeExpander,
      macAddressLookup,
      macAddressGenerator,
      ipv6UlaGenerator,
      websocketTester,
    ],
  },
  {
    name: 'Math',
    components: [mathEvaluator, etaCalculator, percentageCalculator],
  },
  {
    name: 'Measurement',
    components: [chronometer, benchmarkBuilder],
  },
  {
    name: 'Text',
    components: [
      loremIpsumGenerator,
      textStatistics,
      emojiPicker,
      textDiff,
    ],
  },
  {
    name: 'Data',
    components: [ibanValidatorAndParser],
  },
];

export const tools = toolsByCategory.flatMap(({ components }) => components);
export const toolsWithCategory = toolsByCategory.flatMap(({ components, name }) =>
  components.map((tool) => ({ category: name, ...tool })),
);
