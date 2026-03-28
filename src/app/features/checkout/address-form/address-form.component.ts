import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactInfo, ShippingAddress } from '../../../shared/models/checkout.model';

interface DropdownOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent implements OnInit {
  @Input() formType: 'contact' | 'address' = 'address';
  @Output() submit = new EventEmitter<any>();

  form!: FormGroup;
  countries: DropdownOption[] = [
    { label: 'United States', value: 'US' },
    { label: 'Canada', value: 'CA' },
    { label: 'Mexico', value: 'MX' },
  ];
  states: DropdownOption[] = [
    { label: 'California', value: 'CA' },
    { label: 'Texas', value: 'TX' },
    { label: 'New York', value: 'NY' },
    { label: 'Florida', value: 'FL' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    if (this.formType === 'contact') {
      this.form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      });
    } else {
      this.form = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        addressLine1: ['', Validators.required],
        addressLine2: [''],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
        country: ['US', Validators.required],
      });
    }
  }

  onSubmit(): void {
    // Only emit if the form is actually valid
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    } else {
      // Mark all fields as touched so error styling triggers if user clicks submit early
      this.form.markAllAsTouched();
    }
  }
}