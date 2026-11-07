import { Page, Locator } from '@playwright/test'

interface transactionForm {
  name: string
  income: string
  expense: string
  date: string
  contact: string
}

export class AddTransactionPage {
  readonly page: Page
  readonly addTransactionModalButton: Locator
  readonly transactionModalBodyLocator: Locator
  readonly transactionModalComponents: {
    nameInput: Locator
    incomeInput: Locator
    expenseInput: Locator
    datePicker: Locator
    contactInput: Locator
    saveButton: Locator
  }
  readonly transactionModalValidation: {
    expenseIncome: Locator
  }

  constructor(page: Page) {
    this.page = page
    this.addTransactionModalButton = page.getByTestId('createTransactionModalButton')
    this.transactionModalBodyLocator = page.getByTestId('transactionModalBody')
    this.transactionModalComponents = {
      nameInput: this.transactionModalBodyLocator.getByTestId('transactionNameInput'),
      expenseInput: this.transactionModalBodyLocator.getByTestId('transactionExpenseInput'),
      incomeInput: this.transactionModalBodyLocator.getByTestId('transactionIncomeInput'),
      datePicker: this.transactionModalBodyLocator.getByTestId('transactionDatePicker'),
      contactInput: this.transactionModalBodyLocator.getByTestId('transactionContactInput'),
      saveButton: this.transactionModalBodyLocator.getByTestId('transactionSaveButton'),
    }
    this.transactionModalValidation = {
      expenseIncome: this.transactionModalBodyLocator.getByTestId(
        'transactionExpenseIncomeValidation',
      ),
    }
  }

  async fillTransactionForm(data: transactionForm) {
    await this.fillTransactionName(data.name)
    await this.fillTransactionExpense(data.expense)
    await this.fillTransactionIncome(data.income)
    await this.fillTransactionDate(data.date)
    await this.fillTransactionContact(data.contact)
    await this.clickSaveTransactionButton()
  }

  async fillTransactionName(name: string) {
    await this.transactionModalComponents.nameInput.fill(name)
  }

  async fillTransactionExpense(num: string) {
    await this.transactionModalComponents.expenseInput.fill(num)
  }

  async fillTransactionIncome(num: string) {
    await this.transactionModalComponents.incomeInput.fill(num)
  }

  async fillTransactionDate(date: string) {
    await this.transactionModalComponents.datePicker.fill(date)
  }

  async fillTransactionContact(text: string) {
    await this.transactionModalComponents.contactInput.fill(text)
  }

  async clickSaveTransactionButton() {
    await this.transactionModalComponents.saveButton.click()
  }

  async openAddTransactionModal() {
    await this.addTransactionModalButton.click()
  }
}
