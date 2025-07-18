import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [inputValue, setInputValue] = useState('');
  const [fromBase, setFromBase] = useState('10');
  const [toBase, setToBase] = useState('2');
  const [result, setResult] = useState('');
  const [calcNum1, setCalcNum1] = useState('');
  const [calcNum2, setCalcNum2] = useState('');
  const [calcBase, setCalcBase] = useState('10');
  const [calcOperation, setCalcOperation] = useState('+');
  const [calcResult, setCalcResult] = useState('');

  const numberSystems = [
    { value: '2', label: 'Двоичная (2)', description: 'Используется в компьютерах' },
    { value: '8', label: 'Восьмеричная (8)', description: 'Группировка двоичных разрядов' },
    { value: '10', label: 'Десятичная (10)', description: 'Привычная система' },
    { value: '16', label: 'Шестнадцатеричная (16)', description: 'Программирование' },
    { value: '3', label: 'Троичная (3)', description: 'Альтернативная система' },
    { value: '36', label: 'Система по основанию 36', description: 'Максимальное основание' }
  ];

  const convertNumber = () => {
    try {
      if (!inputValue.trim()) {
        setResult('');
        return;
      }

      const fromBaseNum = parseInt(fromBase);
      const toBaseNum = parseInt(toBase);
      
      // Проверка корректности введенного числа
      const validChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const allowedChars = validChars.slice(0, fromBaseNum);
      
      if (!inputValue.toUpperCase().split('').every(char => allowedChars.includes(char))) {
        setResult('Ошибка: недопустимые символы для выбранной системы');
        return;
      }

      const decimal = parseInt(inputValue, fromBaseNum);
      const converted = decimal.toString(toBaseNum).toUpperCase();
      setResult(converted);
    } catch (error) {
      setResult('Ошибка конвертации');
    }
  };

  const calculate = () => {
    try {
      if (!calcNum1.trim() || !calcNum2.trim()) {
        setCalcResult('');
        return;
      }

      const base = parseInt(calcBase);
      const num1 = parseInt(calcNum1, base);
      const num2 = parseInt(calcNum2, base);
      
      let result;
      switch (calcOperation) {
        case '+':
          result = num1 + num2;
          break;
        case '-':
          result = num1 - num2;
          break;
        case '*':
          result = num1 * num2;
          break;
        case '/':
          result = Math.floor(num1 / num2);
          break;
        default:
          result = 0;
      }

      setCalcResult(result.toString(base).toUpperCase());
    } catch (error) {
      setCalcResult('Ошибка вычисления');
    }
  };

  const getStepByStepConversion = () => {
    if (!inputValue.trim() || !result) return [];

    const fromBaseNum = parseInt(fromBase);
    const toBaseNum = parseInt(toBase);
    const decimal = parseInt(inputValue, fromBaseNum);
    
    const steps = [];
    
    if (fromBaseNum !== 10) {
      steps.push(`${inputValue}₍${fromBase}₎ = ${decimal}₍₁₀₎`);
    }
    
    if (toBaseNum !== 10) {
      let temp = decimal;
      const remainders = [];
      while (temp > 0) {
        remainders.unshift(temp % toBaseNum);
        temp = Math.floor(temp / toBaseNum);
      }
      steps.push(`${decimal}₍₁₀₎ = ${result}₍${toBase}₎`);
    }
    
    return steps;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 rounded-lg">
              <Icon name="Calculator" className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800" style={{ fontFamily: 'Times New Roman, serif' }}>
                Конструктор систем счисления
              </h1>
              <p className="text-slate-600 mt-1">
                Академический инструмент для изучения различных систем счисления
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="converter" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
            <TabsTrigger value="converter" className="flex items-center gap-2">
              <Icon name="ArrowLeftRight" className="h-4 w-4" />
              Конвертер
            </TabsTrigger>
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <Icon name="Calculator" className="h-4 w-4" />
              Калькулятор
            </TabsTrigger>
            <TabsTrigger value="theory" className="flex items-center gap-2">
              <Icon name="BookOpen" className="h-4 w-4" />
              Теория
            </TabsTrigger>
          </TabsList>

          {/* Конвертер */}
          <TabsContent value="converter" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="ArrowLeftRight" className="h-5 w-5 text-blue-600" />
                    Конвертер чисел
                  </CardTitle>
                  <CardDescription>
                    Преобразование между различными системами счисления
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="input-number">Исходное число</Label>
                    <Input
                      id="input-number"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value.toUpperCase())}
                      placeholder="Введите число"
                      className="font-mono text-lg"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Из системы</Label>
                      <Select value={fromBase} onValueChange={setFromBase}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {numberSystems.map((system) => (
                            <SelectItem key={system.value} value={system.value}>
                              {system.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>В систему</Label>
                      <Select value={toBase} onValueChange={setToBase}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {numberSystems.map((system) => (
                            <SelectItem key={system.value} value={system.value}>
                              {system.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Button onClick={convertNumber} className="w-full bg-blue-600 hover:bg-blue-700">
                    <Icon name="ArrowRight" className="h-4 w-4 mr-2" />
                    Конвертировать
                  </Button>
                  
                  {result && (
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <Label className="text-sm font-medium text-green-800">Результат:</Label>
                      <div className="font-mono text-xl font-bold text-green-900 mt-1">
                        {result}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader className="bg-slate-50">
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="ListOrdered" className="h-5 w-5 text-slate-600" />
                    Пошаговое решение
                  </CardTitle>
                  <CardDescription>
                    Детальный процесс конвертации
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  {getStepByStepConversion().length > 0 ? (
                    <div className="space-y-3">
                      {getStepByStepConversion().map((step, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                          <Badge variant="outline" className="text-xs">
                            {index + 1}
                          </Badge>
                          <code className="font-mono text-sm">{step}</code>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-500">
                      <Icon name="Calculator" className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>Введите число для просмотра пошагового решения</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Таблица систем счисления */}
            <Card className="shadow-lg">
              <CardHeader className="bg-indigo-50">
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Table" className="h-5 w-5 text-indigo-600" />
                  Системы счисления
                </CardTitle>
                <CardDescription>
                  Основные характеристики различных систем
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {numberSystems.map((system) => (
                    <div key={system.value} className="p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-sm font-mono">
                          {system.value}
                        </Badge>
                        <span className="text-sm font-medium">{system.label.split(' ')[0]}</span>
                      </div>
                      <p className="text-sm text-slate-600">{system.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Калькулятор */}
          <TabsContent value="calculator" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader className="bg-green-50">
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Calculator" className="h-5 w-5 text-green-600" />
                  Калькулятор систем счисления
                </CardTitle>
                <CardDescription>
                  Арифметические операции в различных системах счисления
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <Label>Система счисления</Label>
                  <Select value={calcBase} onValueChange={setCalcBase}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {numberSystems.map((system) => (
                        <SelectItem key={system.value} value={system.value}>
                          {system.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-5 gap-2 items-end">
                  <div className="space-y-2">
                    <Label>Число 1</Label>
                    <Input
                      value={calcNum1}
                      onChange={(e) => setCalcNum1(e.target.value.toUpperCase())}
                      placeholder="0"
                      className="font-mono text-center"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Операция</Label>
                    <Select value={calcOperation} onValueChange={setCalcOperation}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="+">+</SelectItem>
                        <SelectItem value="-">−</SelectItem>
                        <SelectItem value="*">×</SelectItem>
                        <SelectItem value="/">÷</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Число 2</Label>
                    <Input
                      value={calcNum2}
                      onChange={(e) => setCalcNum2(e.target.value.toUpperCase())}
                      placeholder="0"
                      className="font-mono text-center"
                    />
                  </div>
                  
                  <div className="flex items-center justify-center h-10">
                    <span className="text-2xl font-bold text-slate-400">=</span>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Результат</Label>
                    <div className="h-10 px-3 border rounded-md bg-blue-50 font-mono text-center flex items-center justify-center font-bold text-blue-900">
                      {calcResult || '0'}
                    </div>
                  </div>
                </div>
                
                <Button onClick={calculate} className="w-full bg-green-600 hover:bg-green-700">
                  <Icon name="Equal" className="h-4 w-4 mr-2" />
                  Вычислить
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Теория */}
          <TabsContent value="theory" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg">
                <CardHeader className="bg-purple-50">
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="BookOpen" className="h-5 w-5 text-purple-600" />
                    Основы теории
                  </CardTitle>
                  <CardDescription>
                    Фундаментальные принципы систем счисления
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg">Позиционная система счисления</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      В позиционной системе счисления значение цифры зависит от её позиции в числе. 
                      Каждая позиция представляет степень основания системы.
                    </p>
                    
                    <div className="p-3 bg-slate-100 rounded-lg">
                      <code className="text-sm">
                        N = a₀ × b⁰ + a₁ × b¹ + a₂ × b² + ... + aₙ × bⁿ
                      </code>
                    </div>
                    
                    <p className="text-xs text-slate-500">
                      где b — основание системы, aᵢ — цифры числа
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg">Алгоритм конвертации</h3>
                    <ol className="text-sm text-slate-600 space-y-2 pl-4">
                      <li>1. Преобразовать в десятичную систему</li>
                      <li>2. Разделить на основание целевой системы</li>
                      <li>3. Записать остатки в обратном порядке</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader className="bg-orange-50">
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Lightbulb" className="h-5 w-5 text-orange-600" />
                    Практические примеры
                  </CardTitle>
                  <CardDescription>
                    Примеры конвертации и вычислений
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-3">
                    <h3 className="font-semibold">Пример: 25₁₀ → 2-ая система</h3>
                    <div className="space-y-2 text-sm font-mono bg-slate-50 p-3 rounded-lg">
                      <div>25 ÷ 2 = 12 остаток 1</div>
                      <div>12 ÷ 2 = 6 остаток 0</div>
                      <div>6 ÷ 2 = 3 остаток 0</div>
                      <div>3 ÷ 2 = 1 остаток 1</div>
                      <div>1 ÷ 2 = 0 остаток 1</div>
                      <Separator className="my-2" />
                      <div className="font-bold text-green-700">25₁₀ = 11001₂</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-semibold">Сложение в 2-ой системе</h3>
                    <div className="space-y-2 text-sm font-mono bg-slate-50 p-3 rounded-lg">
                      <div>  1101₂</div>
                      <div>+ 1011₂</div>
                      <div>-------</div>
                      <div className="font-bold text-green-700"> 11000₂</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;