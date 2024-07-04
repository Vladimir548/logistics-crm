import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { IRegistry } from '@/interface/interface-registry';

Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf',
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    padding: 30,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  table: {
    display: 'flex',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 0,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  tableColHeader: {
    width: '35%',
    fontSize: 11,
    padding: 3,
    borderRightWidth: 1,
    borderRightColor: '#000',
    fontWeight: 'bold',
  },
  tableCol: {
    width: '65%',
    fontSize: 11,
    padding: 3,
    borderRightWidth: 1,
    borderRightColor: '#000',
  },
  tableColLast: {
    borderRightWidth: 0,
  },
  section: {
    marginBottom: 0,
  },
  paragraph: {
    fontSize: 10,
    lineHeight: 0,

    fontWeight: 'thin',
  },
  signature: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    border: '1px solid #000',
  },
  signatureBlock: {
    display: 'flex',
    width: '45%',
    justifyContent: 'flex-start',
    fontSize: 11,
    paddingLeft: '1px solid #000',
  },
});

export default function ReactPdf({ data }: { data: IRegistry }) {

  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header}>
          Заявка-договор на перевозку груза № {data.agreement.contractNumber} от{' '}
          {data.createdAt?.split('T')[0]} г.
        </Text>

        <View style={styles.table}>
          {[
            ['Грузоотправитель', data.agreement.carrier.name],
            ['Грузополучатель', data.application.costumer.name],
            ['Маршрут', data.agreement.route],
            ['Дата погрузки', data.agreement.dateOfDownload?.split('T')[0]],
            ['Адрес погрузки', data.application.unloadingAddress],
            [
              'Контактное лицо, номер телефона',
              data.agreement.carrierContactPerson.fullName,
              data.agreement.carrierContactPerson.numberPhone,
            ],
            ['Дата разгрузки', data.agreement.unloadingDate?.split('T')[0]],
            ['Адрес разгрузки', data.application.unloadingAddress],
            [
              'Контактное лицо, номер телефона',
              data.application.costumerContactPerson.fullName,
              data.application.costumerContactPerson.numberPhone,
            ],
            ['Тип подвижного состава, способ погрузки/разгрузки', ''],
            ['№ам/ прицеп марка', ''],
            [
              'ФИО водителя паспорт/телефон',
              data.agreement.driver.fullName,
              data.agreement.driver.passportNumberAndSeries,
              data.agreement.driver.numberPhone,
            ],
            ['Характер груза', data.application.weight],
            ['Ставка за перевозку, руб.', data.application?.invoice?.amountOfPaymentToUs],
            ['Условия оплаты', data.application?.invoice?.paymentDeadlineToUs],
            ['Дополнительно', ''],
          ].map(([header, content], index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableColHeader}>{header}</Text>
              {/*<Text style={[styles.tableCol, index === 15 && styles.tableColLast]}>{content}</Text>*/}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.paragraph}>
            Право Вас направить акт обратно по факсу настоящую заявку полностью и печатью.
          </Text>
          <Text style={styles.paragraph}>
            В случае изменения стоимости перевозки полная занята является неотъемлемой частью
            договора перевозки.
          </Text>
          <Text style={styles.paragraph}>
            Факсимильная копия настоящей заявки является действительной.
          </Text>
          <Text style={styles.paragraph}>
            Заказчик оплачивает простой машины – 500руб/час, но не более 3000р.
          </Text>
          <Text style={styles.paragraph}>
            При полной или частичной утрате груза, или повреждении грузо отправитель по тварде
            экспедитор несет материальную ответственность в соответствии с действующим
            законодательством РФ.
          </Text>
          <Text style={styles.paragraph}>
            Претензии по количеству и качеству принимаются при наличии экспедитора/перевозчика.
          </Text>
          <Text style={styles.paragraph}>
            Заказчик оплачивает простой под погрузкой и разгрузкой свыше 24 часов.
          </Text>
          <Text style={styles.paragraph}>
            Оплата неустойки (штрафов) по вине экспедитора заказчикам в размере 1000 руб./день за
            каждые сутки.
          </Text>
          <Text style={styles.paragraph}>
            Заказчик имеет право отменить или подзвонить заявку за 5 часов до погрузки.
          </Text>
        </View>

        <View style={styles.signature}>
          <View style={styles.signatureBlock}>
            <Text style={{ fontWeight: 'bold' }}>Экспедитор</Text>
            <Text>ООО ______________</Text>
            <Text>Юридический адрес: ______________</Text>
            <Text>ИНН: ______________</Text>
            <Text>КПП: ______________</Text>
            <Text>ОГРН: ______________</Text>
            <Text>Расчетный счет: ______________</Text>
            <Text>БИК: ______________</Text>
            <Text>Банк: ______________</Text>
            <Text>Корр. Счет: ______________</Text>
            <Text>____________________</Text>
            <Text>(подпись)</Text>
          </View>

          <View style={styles.signatureBlock}>
            <Text style={{ fontWeight: 'bold' }}>Перевозчик</Text>
            <Text>{data.agreement.carrier.name}</Text>
            <Text>Юридический адрес:{data.agreement.carrier.legalAndActualAddress}</Text>
            <Text>ИНН: {data.agreement.carrier.inn}</Text>
            <Text>КПП: {data.agreement.carrier.kpp}</Text>
            <Text>ОГРН: {data.agreement.carrier.ogrn}</Text>
            <Text>Расчетный счет: {data.agreement.carrier.cashAccount}</Text>
            <Text>БИК: {data.agreement.carrier.bic}</Text>
            <Text>Банк: {data.agreement.carrier.bank}</Text>
            <Text>Корр. Счет: {data.agreement.carrier.checkingAccount}</Text>
            <Text>____________________</Text>
            <Text>(подпись)</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
